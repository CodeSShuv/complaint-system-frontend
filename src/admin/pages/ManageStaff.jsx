import StaffForm from "../components/StaffForm";
// import StaffList from "../components/StaffList";

export default function ManageStaff() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-800">Manage Staff</h1>
      <StaffForm />
      {/* <StaffList /> */}
    </div>
  );
}
