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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateShow, useAssignDjToShow } from '../../hooks/useQueries';
import type { Show, DJ } from '../../backend';
import { Loader2 } from 'lucide-react';

interface ShowFormModalProps {
  open: boolean;
  onClose: () => void;
  editingShow: Show | null;
  djs: DJ[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Daily', 'Weekdays', 'Weekends'];

export default function ShowFormModal({ open, onClose, editingShow, djs }: ShowFormModalProps) {
  const createShow = useCreateShow();
  const assignDj = useAssignDjToShow();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduleDay, setScheduleDay] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [selectedDjId, setSelectedDjId] = useState<string>('none');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!editingShow;
  const isLoading = createShow.isPending || assignDj.isPending;

  useEffect(() => {
    if (open) {
      if (editingShow) {
        setTitle(editingShow.title);
        setDescription(editingShow.description);
        setScheduleDay(editingShow.scheduleDay);
        setScheduleTime(editingShow.scheduleTime);
        setSelectedDjId(editingShow.djId !== undefined ? editingShow.djId.toString() : 'none');
      } else {
        setTitle('');
        setDescription('');
        setScheduleDay('');
        setScheduleTime('');
        setSelectedDjId('none');
      }
      setErrors({});
      createShow.reset();
      assignDj.reset();
    }
  }, [open, editingShow]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!scheduleDay.trim()) newErrors.scheduleDay = 'Schedule day is required';
    if (!scheduleTime.trim()) newErrors.scheduleTime = 'Schedule time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing && editingShow) {
      // For editing: only update DJ assignment (backend limitation)
      if (selectedDjId !== 'none') {
        await assignDj.mutateAsync({
          showId: editingShow.id,
          djId: BigInt(selectedDjId),
        });
      }
      onClose();
    } else {
      // Create new show
      const djId = selectedDjId !== 'none' ? BigInt(selectedDjId) : undefined;
      await createShow.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        scheduleDay: scheduleDay.trim(),
        scheduleTime: scheduleTime.trim(),
        djId,
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="bg-admin-card border border-amber/20 text-tan max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold text-amber">
            {isEditing ? 'Edit Show' : 'Add New Show'}
          </DialogTitle>
          <DialogDescription className="font-body text-tan/50 text-sm">
            {isEditing
              ? 'Update the DJ assignment for this show. Note: title and schedule cannot be changed after creation.'
              : 'Fill in the details to create a new radio show.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="show-title" className="font-body text-sm text-tan/80">
              Title <span className="text-burnt-orange">*</span>
            </Label>
            <Input
              id="show-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning Roundup"
              disabled={isEditing || isLoading}
              className="bg-admin-bg border-amber/20 text-tan placeholder:text-tan/30 focus:border-amber disabled:opacity-50"
            />
            {errors.title && <p className="font-body text-xs text-destructive">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="show-desc" className="font-body text-sm text-tan/80">Description</Label>
            <Textarea
              id="show-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the show..."
              rows={3}
              disabled={isEditing || isLoading}
              className="bg-admin-bg border-amber/20 text-tan placeholder:text-tan/30 focus:border-amber resize-none disabled:opacity-50"
            />
          </div>

          {/* Schedule Day */}
          <div className="space-y-1.5">
            <Label htmlFor="show-day" className="font-body text-sm text-tan/80">
              Schedule Day <span className="text-burnt-orange">*</span>
            </Label>
            <Select
              value={scheduleDay}
              onValueChange={setScheduleDay}
              disabled={isEditing || isLoading}
            >
              <SelectTrigger
                id="show-day"
                className="bg-admin-bg border-amber/20 text-tan focus:border-amber disabled:opacity-50"
              >
                <SelectValue placeholder="Select a day..." />
              </SelectTrigger>
              <SelectContent className="bg-admin-card border-amber/20">
                {DAYS.map((day) => (
                  <SelectItem key={day} value={day} className="text-tan hover:bg-amber/10 focus:bg-amber/10">
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.scheduleDay && <p className="font-body text-xs text-destructive">{errors.scheduleDay}</p>}
          </div>

          {/* Schedule Time */}
          <div className="space-y-1.5">
            <Label htmlFor="show-time" className="font-body text-sm text-tan/80">
              Schedule Time <span className="text-burnt-orange">*</span>
            </Label>
            <Input
              id="show-time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              placeholder="e.g. 7:00 AM - 10:00 AM"
              disabled={isEditing || isLoading}
              className="bg-admin-bg border-amber/20 text-tan placeholder:text-tan/30 focus:border-amber disabled:opacity-50"
            />
            <p className="font-body text-xs text-tan/40">Enter time in CST (Central Standard Time)</p>
            {errors.scheduleTime && <p className="font-body text-xs text-destructive">{errors.scheduleTime}</p>}
          </div>

          {/* DJ Selection */}
          <div className="space-y-1.5">
            <Label htmlFor="show-dj" className="font-body text-sm text-tan/80">Assign DJ</Label>
            <Select
              value={selectedDjId}
              onValueChange={setSelectedDjId}
              disabled={isLoading}
            >
              <SelectTrigger
                id="show-dj"
                className="bg-admin-bg border-amber/20 text-tan focus:border-amber"
              >
                <SelectValue placeholder="Select a DJ..." />
              </SelectTrigger>
              <SelectContent className="bg-admin-card border-amber/20">
                <SelectItem value="none" className="text-tan/50 hover:bg-amber/10 focus:bg-amber/10">
                  No DJ assigned
                </SelectItem>
                {djs.map((dj) => (
                  <SelectItem
                    key={dj.id.toString()}
                    value={dj.id.toString()}
                    className="text-tan hover:bg-amber/10 focus:bg-amber/10"
                  >
                    {dj.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(createShow.isError || assignDj.isError) && (
            <p className="font-body text-xs text-destructive bg-destructive/10 px-3 py-2 rounded">
              {(createShow.error as Error)?.message || (assignDj.error as Error)?.message || 'An error occurred. Please try again.'}
            </p>
          )}

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="text-tan/60 hover:text-tan hover:bg-amber/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-amber hover:bg-amber-light text-wood-dark font-display font-bold gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditing ? 'Update DJ' : 'Create Show'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
