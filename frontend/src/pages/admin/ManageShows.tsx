import { useState } from 'react';
import { Plus, Pencil, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetAllShows, useGetAllDJs } from '../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import ShowFormModal from '../../components/admin/ShowFormModal';
import type { Show } from '../../backend';

export default function ManageShows() {
  const { data: shows = [], isLoading: showsLoading } = useGetAllShows();
  const { data: djs = [], isLoading: djsLoading } = useGetAllDJs();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);

  const isLoading = showsLoading || djsLoading;

  const handleAdd = () => {
    setEditingShow(null);
    setModalOpen(true);
  };

  const handleEdit = (show: Show) => {
    setEditingShow(show);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingShow(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black text-amber">Manage Shows</h1>
          <p className="font-body text-tan/60 mt-1">Create and manage radio show programming.</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-amber hover:bg-amber-light text-wood-dark font-display font-bold gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Show
        </Button>
      </div>

      {/* Shows Table */}
      <div className="bg-admin-card border border-amber/20 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-14 bg-amber/5" />)}
          </div>
        ) : shows.length === 0 ? (
          <div className="p-16 text-center">
            <Radio className="w-12 h-12 text-amber/20 mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-amber/40 mb-2">No Shows Yet</h3>
            <p className="font-body text-tan/30 text-sm mb-6">Get started by adding your first show.</p>
            <Button
              onClick={handleAdd}
              className="bg-amber hover:bg-amber-light text-wood-dark font-display font-bold gap-2"
            >
              <Plus className="w-4 h-4" />
              Add First Show
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber/10">
                  <th className="text-left px-6 py-3 font-body text-xs text-tan/40 uppercase tracking-widest">Title</th>
                  <th className="text-left px-6 py-3 font-body text-xs text-tan/40 uppercase tracking-widest hidden md:table-cell">Schedule</th>
                  <th className="text-left px-6 py-3 font-body text-xs text-tan/40 uppercase tracking-widest hidden lg:table-cell">DJ</th>
                  <th className="text-left px-6 py-3 font-body text-xs text-tan/40 uppercase tracking-widest hidden xl:table-cell">Description</th>
                  <th className="text-right px-6 py-3 font-body text-xs text-tan/40 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber/10">
                {shows.map((show) => {
                  const dj = show.djId !== undefined ? djs.find((d) => d.id === show.djId) : null;
                  return (
                    <tr key={show.id.toString()} className="hover:bg-amber/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-body text-sm font-medium text-tan/90">{show.title}</p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="font-body text-sm text-tan/60">{show.scheduleDay}</p>
                        <p className="font-body text-xs text-tan/40">{show.scheduleTime}</p>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        {dj ? (
                          <span className="font-body text-xs text-amber/80 bg-amber/10 px-2 py-1 rounded">
                            {dj.name}
                          </span>
                        ) : (
                          <span className="font-body text-xs text-tan/30">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell">
                        <p className="font-body text-xs text-tan/50 line-clamp-1 max-w-xs">
                          {show.description || '—'}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(show)}
                          className="text-tan/60 hover:text-amber hover:bg-amber/10 gap-1.5"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ShowFormModal
        open={modalOpen}
        onClose={handleClose}
        editingShow={editingShow}
        djs={djs}
      />
    </div>
  );
}
