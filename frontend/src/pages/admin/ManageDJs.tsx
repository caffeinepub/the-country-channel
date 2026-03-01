import { useState } from 'react';
import { Plus, Pencil, Mic2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetAllDJs } from '../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import DJFormModal from '../../components/admin/DJFormModal';
import type { DJ } from '../../backend';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function ManageDJs() {
  const { data: djs = [], isLoading } = useGetAllDJs();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDJ, setEditingDJ] = useState<DJ | null>(null);

  const handleAdd = () => {
    setEditingDJ(null);
    setModalOpen(true);
  };

  const handleEdit = (dj: DJ) => {
    setEditingDJ(dj);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingDJ(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black text-amber">Manage DJs</h1>
          <p className="font-body text-tan/60 mt-1">Add and manage on-air personalities.</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-amber hover:bg-amber-light text-wood-dark font-display font-bold gap-2"
        >
          <Plus className="w-4 h-4" />
          Add DJ
        </Button>
      </div>

      {/* DJs Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 rounded-xl bg-admin-card" />)}
        </div>
      ) : djs.length === 0 ? (
        <div className="bg-admin-card border border-amber/20 rounded-xl p-16 text-center">
          <Mic2 className="w-12 h-12 text-amber/20 mx-auto mb-4" />
          <h3 className="font-display text-lg font-bold text-amber/40 mb-2">No DJs Yet</h3>
          <p className="font-body text-tan/30 text-sm mb-6">Add your first DJ to get started.</p>
          <Button
            onClick={handleAdd}
            className="bg-amber hover:bg-amber-light text-wood-dark font-display font-bold gap-2"
          >
            <Plus className="w-4 h-4" />
            Add First DJ
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {djs.map((dj) => {
            const initials = dj.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
            return (
              <div
                key={dj.id.toString()}
                className="bg-admin-card border border-amber/20 rounded-xl p-5 hover:border-amber/40 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14 border-2 border-amber/20 flex-shrink-0">
                    {dj.photoUrl ? (
                      <AvatarImage src={dj.photoUrl} alt={dj.name} className="object-cover" />
                    ) : null}
                    <AvatarFallback className="bg-amber/15 text-amber font-display font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-bold text-amber leading-tight">{dj.name}</h3>
                    <p className="font-body text-xs text-tan/50 mt-1 line-clamp-2">{dj.bio || 'No bio'}</p>
                    {dj.photoUrl && (
                      <p className="font-body text-xs text-tan/30 mt-1 truncate">{dj.photoUrl}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(dj)}
                    className="text-tan/60 hover:text-amber hover:bg-amber/10 gap-1.5"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DJFormModal
        open={modalOpen}
        onClose={handleClose}
        editingDJ={editingDJ}
      />
    </div>
  );
}
