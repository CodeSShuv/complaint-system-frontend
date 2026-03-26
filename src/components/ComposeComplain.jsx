import { useEffect, useState } from "react";
import { postComplain } from "../api/complain";
import { fetchDepartments } from "../api/department.js";
export default function ComposeComplain() {
  const [open, setOpen] = useState(false);
  const [department, setdepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [deptList,setDeptList] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // replace with real submit logic
    let model = {  subject: subject, message: message,deptId :department };
    try {

      await postComplain(model);
      setdepartment("");
      setSubject("");
      setMessage("");
      setOpen(false);
    } catch (error) {

    }

    // clear after send (optional)
  };
  const handleFetchDepartment =  async ()=>{
    let res = await fetchDepartments();
    setDeptList(res);
  }
  useEffect(()=>{
    if(deptList){
      handleFetchDepartment();
    }
  },[]);

  return <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[420px] z-50">
    {open ? (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b sticky top-0 z-10">
          <h3 className="text-sm font-semibold text-gray-800">
            New Complaint
          </h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-4"
        >
          {/* department */}
          <div>
            <label className="block text-xs font-semibold text-gray-700">
              department
            </label>
            <select
              value={department}
              onChange={(e) => setdepartment(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            >
              <option value="">Select department</option>
              { deptList?.map((dep)=>{
              return (
            <option value={dep.name}>{dep.name}</option>
          )
              }) }
             
            </select>
          </div>

          {/* Subject */}
          <div>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              required
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-indigo-600"
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              placeholder="Write your complaint..."
              required
              className="w-full resize-none text-sm focus:outline-none border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-white sticky bottom-0 z-10">
          <button
            type="button"
            onClick={() => {
              setdepartment("");
              setSubject("");
              setMessage("");
            }}
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Discard
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white text-sm px-5 py-1.5 rounded-full shadow hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    ) : (
      /* Floating Compose Button */
      <button
        onClick={() => setOpen(true)}
        className="ml-auto bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 flex items-center gap-2 transition"
      >
        ✏️ <span className="hidden sm:inline">Compose</span>
      </button>
    )}
  </div>



}
