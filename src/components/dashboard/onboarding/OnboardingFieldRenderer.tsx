
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OnboardingData } from "@/types/onboarding";

interface OnboardingFieldRendererProps {
  fieldKey: keyof OnboardingData;
  label: string;
  value: any;
  isEditing: boolean;
  type?: 'text' | 'textarea' | 'select';
  options?: string[];
  onChange: (key: keyof OnboardingData, value: any) => void;
}

const OnboardingFieldRenderer = ({
  fieldKey,
  label,
  value,
  isEditing,
  type = 'text',
  options,
  onChange
}: OnboardingFieldRendererProps) => {
  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, index) => (
            <Badge key={index} variant="secondary">{item}</Badge>
          ))}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="text-sm">
              <span className="font-medium">{key}:</span> {String(val)}
            </div>
          ))}
        </div>
      );
    }

    return <span className="text-sm text-gray-600">{String(value) || 'Not defined'}</span>;
  };

  if (!isEditing) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {renderValue(value)}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Textarea
          value={String(value || '')}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          rows={3}
        />
      </div>
    );
  }

  if (type === 'select' && options) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Select
          value={String(value || '')}
          onValueChange={(newValue) => onChange(fieldKey, newValue)}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Choose ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Input
        value={String(value || '')}
        onChange={(e) => onChange(fieldKey, e.target.value)}
      />
    </div>
  );
};

export default OnboardingFieldRenderer;
