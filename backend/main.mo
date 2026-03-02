import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";

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

  /// Returns the currently scheduled show based on CST (Central Standard Time, UTC-6).
  /// The method applies the UTC-6 offset to the IC system time, determines the current
  /// CST day and time, and matches it against each show's schedule.
  public query ({ caller }) func getCurrentShow() : async ?Show {
    let nowNanos = Time.now();

    // Adjust to CST (UTC-6)
    let cstNowNanos = nowNanos - (6 * 60 * 60 * 1000000000);

    // Derive day and hour in CST
    let dayNanos = 24 * 60 * 60 * 1000000000;
    let totalDays = cstNowNanos / dayNanos;

    let weekDaysCST : [Text] = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let currentDayIndex = Int.abs((totalDays % 7).toNat());
    let currentDay = weekDaysCST[currentDayIndex];

    let nanosInDay = 24 * 60 * 60 * 1000000000;
    let nanosToday = cstNowNanos % nanosInDay;
    let currentHour = Int.abs(nanosToday / (60 * 60 * 1000000000));
    let currentMinute = Int.abs(nanosToday % (60 * 60 * 1000000000) / (60 * 1000000000));

    func isShowCurrent(show : Show) : Bool {
      if (show.scheduleDay != currentDay) {
        return false;
      };

      let timeParts = show.scheduleTime.split(#char(':'));
      let partsArray = timeParts.toArray();
      if (partsArray.size() != 2) {
        return false;
      };

      func tryParse(timeStr : Text) : ?Int {
        let chars = timeStr.toArray();
        if (chars.size() == 0) { return null };
        if (chars[0] == '0') {
          if (chars.size() > 1) { 
            return Int.fromText(Text.fromArray(chars.sliceToArray(1, chars.size())));
          } else { return ?0 };
        } else { return Int.fromText(timeStr) };
      };

      let timeRangeParts = partsArray[1].split(#text(" - "));
      let timeRangeArray = timeRangeParts.toArray();

      var withinTimeRange = false;
      for (rangePart in timeRangeArray.values()) {
        let hourParts = rangePart.split(#char(':'));
        let hourArray = hourParts.toArray();
        if (hourArray.size() > 0) {
          switch (tryParse(hourArray[0])) {
            case (?startHour) {
              if (currentHour == Int.abs(startHour)) {
                withinTimeRange := true;
              };
            };
            case (null) { () };
          };
        };
      };

      withinTimeRange;
    };

    let showsIter = shows.entries();
    for ((_, show) in showsIter) {
      if (isShowCurrent(show)) {
        return ?show;
      };
    };

    var hoursAgo : Int = 0;
    let originalDay = currentDay;
    let hoursSinceStartOfDay = currentHour * 60 + currentMinute;
    switch (shows.entries().next()) {
      case (?(_id, show)) {
        ?show;
      };
      case (null) {
        null;
      };
    };
  };
};
