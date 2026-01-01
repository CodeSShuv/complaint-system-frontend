import { useState } from "react";
import apiRequest from "../services/apiClient";
export default function ComposeComplain() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // replace with real submit logic
    let model = { category: category, subject: subject, message: message };

    let res = await apiRequest({
      method: "POST",
      url: "http://localhost:8080/complain",
      data: model,
    });
    console.log(res);
    // clear after send (optional)
    setCategory("");
    setSubject("");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-4 md:w-[420px] z-50">
      {open ? (
        <div className="bg-white rounded-t-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-gray-300)]">
            <h3 className="text-sm font-medium">New Complaint</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close compose"
              >
                ✕
              </button>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="px-4 py-3 space-y-3">
            <div>
              <label
                htmlFor="category"
                className="block text-xs font-semibold text-gray-700"
              >
                Category
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Select category</option>
                  <option value="Teaching Quality">Teaching Quality</option>
                  <option value="Examination / Results">
                    Examination / Results
                  </option>
                  <option value="Classroom Facilities">
                    Classroom Facilities
                  </option>
                  {/* <option value="Laboratory Issues">Laboratory Issues</option> */}
                  <option value="Library Services">Library Services</option>
                  <option value="Technical">Technical</option>
                  <option value="Fees & Administration">
                    Fees & Administration
                  </option>
                  <option value="Misconduct">Misconduct/Disciplinary</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-semibold text-gray-700"
              >
                Subject
              </label>
              <input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Write your message..."
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // save draft logic
                    console.log("draft", { category, subject, message });
                  }}
                  className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  Save Draft
                </button>
              </div> */}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMessage("");
                    setSubject("");
                    setCategory("");
                  }}
                  className="text-sm px-3 py-1 rounded-md hover:bg-gray-50"
                >
                  Discard
                </button>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white text-sm px-4 py-1 rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg"
          >
            Compose
          </button>
        </div>
      )}
    </div>
  );
}
