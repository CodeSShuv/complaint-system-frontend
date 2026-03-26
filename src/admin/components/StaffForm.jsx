import { useEffect, useState } from "react";
import axios from "axios";
import { createAdmin } from "../../api/admin";
import { fetchDepartments } from "../../api/department";
export default function StaffForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    department:""

  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [depList, setDepList] = useState([]);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const getDepartments = async ()=>{
    let res = await fetchDepartments();
    setDepList(res);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);
      let res = await createAdmin(formData);
      console.log(res);
      setMessage(res.msg);
      setFormData({ name: "", email: "", password: "", department: "" });
    } catch (err) {
      setMessage(err.msg || "Failed to create staff");
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    console.log(depList)
    if(depList){
      
      getDepartments()
    }
  },[] )
  return (
    <form className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30 space-y-4" onSubmit={handleSubmit}>
      {message && <p className="text-green-600 font-medium">{message}</p>}
      <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition" />
      <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition" />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition" />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition" />
      <select name="department" value={formData.department}
  onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition">
          <option value="">Select Department</option>
        {
          depList.map((dep)=>{
          // console.log(depList)
          return (
            <option value={dep.name}>{dep.name}</option>
          )
        })
       
      }

      </select>
      <button type="submit" disabled={loading} className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-900 transition shadow-md">{loading ? "Creating..." : "Create Staff"}</button>
    </form>
  );
}
