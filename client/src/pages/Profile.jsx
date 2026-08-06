import ProfileInfo from "../components/profile/ProfileInfo";
import ChangePassword from "../components/profile/ChangePassword";
import AvatarUpload from "../components/profile/AvatarUpload";

export default function Profile() {
  return (
    <div className="mx-auto max-w-6xl p-6">

      <h1 className="mb-8 text-3xl font-bold">
        My Profile
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">

        <AvatarUpload />

        <div className="lg:col-span-2 space-y-8">

          <ProfileInfo />

          <ChangePassword />

        </div>

      </div>

    </div>
  );
}