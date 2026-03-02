import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  // Show and DJ Types
  type ShowId = Nat;
  type DjId = Nat;

  type Show = {
    id : ShowId;
    title : Text;
    description : Text;
    scheduleDay : Text;
    scheduleTime : Text;
    djId : ?DjId;
    createdAt : Time.Time;
  };

  module Show {
    public func compare(show1 : Show, show2 : Show) : Order.Order {
      Nat.compare(show1.id, show2.id);
    };
  };

  type DJ = {
    id : DjId;
    name : Text;
    bio : Text;
    photoUrl : Text;
    createdAt : Time.Time;
  };

  module DJ {
    public func compare(dj1 : DJ, dj2 : DJ) : Order.Order {
      Nat.compare(dj1.id, dj2.id);
    };
  };

  // Storage
  var nextShowId : ShowId = 0;
  var nextDjId : DjId = 0;

  let shows = Map.empty<ShowId, Show>();
  let djs = Map.empty<DjId, DJ>();

  // DJ CRUD
  public shared ({ caller }) func createDj(name : Text, bio : Text, photoUrl : Text) : async DjId {
    let dj : DJ = {
      id = nextDjId;
      name;
      bio;
      photoUrl;
      createdAt = Time.now();
    };
    djs.add(nextDjId, dj);
    nextDjId += 1;
    nextDjId - 1;
  };

  public query ({ caller }) func getDj(id : DjId) : async DJ {
    switch (djs.get(id)) {
      case (null) { Runtime.trap("DJ not found") };
      case (?dj) { dj };
    };
  };

  public query ({ caller }) func getAllDjs() : async [DJ] {
    djs.values().toArray().sort();
  };

  // Show CRUD
  public shared ({ caller }) func createShow(title : Text, description : Text, scheduleDay : Text, scheduleTime : Text) : async ShowId {
    let show : Show = {
      id = nextShowId;
      title;
      description;
      scheduleDay;
      scheduleTime;
      djId = null;
      createdAt = Time.now();
    };
    shows.add(nextShowId, show);
    nextShowId += 1;
    nextShowId - 1;
  };

  public shared ({ caller }) func assignDjToShow(showId : ShowId, djId : DjId) : async () {
    switch (shows.get(showId)) {
      case (null) { Runtime.trap("Show not found") };
      case (?show) {
        switch (djs.get(djId)) {
          case (null) { Runtime.trap("DJ not found") };
          case (?_dj) {
            let updatedShow : Show = {
              id = show.id;
              title = show.title;
              description = show.description;
              scheduleDay = show.scheduleDay;
              scheduleTime = show.scheduleTime;
              djId = ?djId;
              createdAt = show.createdAt;
            };
            shows.add(showId, updatedShow);
          };
        };
      };
    };
  };

  public query ({ caller }) func getShow(id : ShowId) : async Show {
    switch (shows.get(id)) {
      case (null) { Runtime.trap("Show not found") };
      case (?show) { show };
    };
  };

  public query ({ caller }) func getAllShows() : async [Show] {
    shows.values().toArray().sort();
  };

  public query ({ caller }) func getCurrentShow() : async ?Show {
    let sortedShows = shows.values().toArray();
    if (sortedShows.size() > 0) {
      ?sortedShows[0];
    } else {
      null;
    };
  };
};
