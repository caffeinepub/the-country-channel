import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateDJ } from '../../hooks/useQueries';
import type { DJ } from '../../backend';
import { Loader2 } from 'lucide-react';

interface DJFormModalProps {
  open: boolean;
  onClose: () => void;
  editingDJ: DJ | null;
}

export default function DJFormModal({ open, onClose, editingDJ }: DJFormModalProps) {
  const createDJ = useCreateDJ();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!editingDJ;
  const isLoading = createDJ.isPending;

  useEffect(() => {
    if (open) {
      if (editingDJ) {
        setName(editingDJ.name);
        setBio(editingDJ.bio);
        setPhotoUrl(editingDJ.photoUrl);
      } else {
        setName('');
        setBio('');
        setPhotoUrl('');
      }
      setErrors({});
      createDJ.reset();
    }
  }, [open, editingDJ]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      // Backend doesn't support updateDj — show info only
      onClose();
      return;
    }

    await createDJ.mutateAsync({
      name: name.trim(),
      bio: bio.trim(),
      photoUrl: photoUrl.trim(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="bg-admin-card border border-amber/20 text-tan max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold text-amber">
            {isEditing ? 'View DJ Details' : 'Add New DJ'}
          </DialogTitle>
          <DialogDescription className="font-body text-tan/50 text-sm">
            {isEditing
              ? 'DJ details are shown below. Editing existing DJs is not yet supported by the backend.'
              : 'Fill in the details to add a new DJ to the roster.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="dj-name" className="font-body text-sm text-tan/80">
              Name <span className="text-burnt-orange">*</span>
            </Label>
            <Input
              id="dj-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Buck Williams"
              disabled={isEditing || isLoading}
              className="bg-admin-bg border-amber/20 text-tan placeholder:text-tan/30 focus:border-amber disabled:opacity-50"
            />
            {errors.name && <p className="font-body text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label htmlFor="dj-bio" className="font-body text-sm text-tan/80">Bio</Label>
            <Textarea
              id="dj-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short bio about the DJ..."
              rows={4}
              disabled={isEditing || isLoading}
              className="bg-admin-bg border-amber/20 text-tan placeholder:text-tan/30 focus:border-amber resize-none disabled:opacity-50"
            />
          </div>

          {/* Photo URL */}
          <div className="space-y-1.5">
            <Label htmlFor="dj-photo" className="font-body text-sm text-tan/80">Photo URL</Label>
            <Input
              id="dj-photo"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              disabled={isEditing || isLoading}
              className="bg-admin-bg border-amber/20 text-tan placeholder:text-tan/30 focus:border-amber disabled:opacity-50"
            />
            {photoUrl && !isEditing && (
              <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border border-amber/20">
                <img
                  src={photoUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          {createDJ.isError && (
            <p className="font-body text-xs text-destructive bg-destructive/10 px-3 py-2 rounded">
              {(createDJ.error as Error)?.message || 'An error occurred. Please try again.'}
            </p>
          )}

          {isEditing && (
            <div className="bg-amber/5 border border-amber/20 rounded-lg px-3 py-2">
              <p className="font-body text-xs text-tan/50">
                ℹ️ Editing DJ details requires backend support for <code className="text-amber/70">updateDj</code>. This feature is coming soon.
              </p>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="text-tan/60 hover:text-tan hover:bg-amber/10"
            >
              {isEditing ? 'Close' : 'Cancel'}
            </Button>
            {!isEditing && (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-amber hover:bg-amber-light text-wood-dark font-display font-bold gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Add DJ
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
