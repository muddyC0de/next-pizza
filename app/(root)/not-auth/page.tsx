import { InfoBlock } from "@/shared/components/shared/info-block";

export default function NotAuthPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ заблокований"
        text="Ця сторінка доступна тільки для зареєстрованих користувачів"
        imageUrl="/lock.png"
      />
    </div>
  );
}
