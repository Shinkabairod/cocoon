
import { Button } from "@/components/ui/button";
import { Edit, Save, X, RefreshCw } from "lucide-react";

interface OnboardingActionButtonsProps {
  isEditing: boolean;
  isSaving: boolean;
  isUpdatingObsidian: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onSyncObsidian: () => void;
}

const OnboardingActionButtons = ({
  isEditing,
  isSaving,
  isUpdatingObsidian,
  onEdit,
  onSave,
  onCancel,
  onSyncObsidian
}: OnboardingActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={onSyncObsidian}
        disabled={isUpdatingObsidian || isSaving}
      >
        {isUpdatingObsidian ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Syncing...
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Obsidian
          </>
        )}
      </Button>
      
      {!isEditing ? (
        <Button onClick={onEdit} disabled={isSaving}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button onClick={onCancel} variant="outline" disabled={isSaving}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={onSave} disabled={isSaving || isUpdatingObsidian}>
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OnboardingActionButtons;
