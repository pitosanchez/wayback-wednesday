import React from "react";

interface Event {
  id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  price: string;
  status: "upcoming" | "live" | "past";
  category: "music" | "culture" | "community" | "special";
}

interface EventFormModalProps {
  isOpen: boolean;
  draft: Partial<Event>;
  onClose: () => void;
  onSave: () => void;
  onChange: (updates: Partial<Event>) => void;
}

const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  draft,
  onClose,
  onSave,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-rich-black border border-white/10 rounded-lg p-6 w-full max-w-lg text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-alt-gothic">
            {draft.id ? "Edit Event" : "Add Event"}
          </h3>
          <button className="text-white/60 hover:text-white" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="text-sm text-white/60">Title</label>
            <input
              className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
              value={draft.title || ""}
              onChange={(e) => onChange({ title: e.target.value })}
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm text-white/60">Date</label>
            <input
              type="date"
              className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
              value={draft.date || ""}
              onChange={(e) => onChange({ date: e.target.value })}
            />
          </div>

          {/* Time */}
          <div>
            <label className="text-sm text-white/60">Time</label>
            <input
              className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
              value={draft.time || ""}
              onChange={(e) => onChange({ time: e.target.value })}
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-white/60">Location</label>
            <input
              className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
              value={draft.location || ""}
              onChange={(e) => onChange({ location: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="text-sm text-white/60">Description</label>
            <textarea
              className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
              rows={3}
              value={draft.description || ""}
              onChange={(e) => onChange({ description: e.target.value })}
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-white/60">Price</label>
            <input
              className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
              value={draft.price || ""}
              onChange={(e) => onChange({ price: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-white/60">Category</label>
            <select
              className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
              value={draft.category}
              onChange={(e) =>
                onChange({
                  category: e.target.value as Event["category"],
                })
              }
            >
              <option value="music">Music</option>
              <option value="culture">Culture</option>
              <option value="community">Community</option>
              <option value="special">Special</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-white/10 rounded hover:bg-white/20"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-white text-rich-black rounded font-semibold hover:bg-white/90"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
