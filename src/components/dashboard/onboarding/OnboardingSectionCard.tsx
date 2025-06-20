
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OnboardingFieldRenderer from "./OnboardingFieldRenderer";
import type { OnboardingData } from "@/types/onboarding";

interface SectionField {
  key: keyof OnboardingData;
  label: string;
  type?: 'text' | 'textarea' | 'select';
  options?: string[];
}

interface OnboardingSectionCardProps {
  title: string;
  icon: React.ReactNode;
  fields: SectionField[];
  data: OnboardingData;
  editData: Partial<OnboardingData>;
  isEditing: boolean;
  onChange: (key: keyof OnboardingData, value: any) => void;
}

const OnboardingSectionCard = ({
  title,
  icon,
  fields,
  data,
  editData,
  isEditing,
  onChange
}: OnboardingSectionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <OnboardingFieldRenderer
            key={String(field.key)}
            fieldKey={field.key}
            label={field.label}
            value={isEditing ? editData[field.key] : data[field.key]}
            isEditing={isEditing}
            type={field.type}
            options={field.options}
            onChange={onChange}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default OnboardingSectionCard;
