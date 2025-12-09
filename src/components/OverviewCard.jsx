
const colorMap = {
  red: "bg-red-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
};
const OverviewCard = ({number,heading,color}) => {
  return (
    <div className={`card flex flex-col justify-center items-center p-5 w-60 ${colorMap[color]} rounded-2xl shadow-xl`}>
<div className="heading">
  <h4 className="text-xl text-center mb-3">{heading}</h4>
</div>
  <div className ="text-4xl font-semibold text-center" >{number} </div>
    </div>
  )
}

export default OverviewCard