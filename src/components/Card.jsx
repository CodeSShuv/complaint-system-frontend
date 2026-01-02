const Card = ({ title, body, status, category }) => {
  let styles = {
    fulfilled: "bg-emerald-50 text-emerald-800 border-emerald-200",
    pending: "bg-red-50 text-red-800 border-red-200",
    active: "bg-amber-50 text-amber-800 border-amber-200",
  };
  return (
    <div class="max-w-sm rounded-2xl border-[#0f172a] bg-white p-6 shadow-lg transition hover:shadow-xl hover:-translate-y-1">
      <div class="h-full rounded-2xl bg-white p-6 transition hover:scale-[1.02]">
        <div>
          <span
            class={`inline-block rounded-full ${styles[status]} px-3 py-1 text-xs font-semibold text-purple-600`}
          >
            {status}
          </span>
          <span
            class={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-gray-600`}
          >
            {category}
          </span>
        </div>

        <h2 class="mt-4 text-xl font-bold text-gray-800">{title}</h2>

        <p class="mt-2 text-sm text-gray-600">{body}</p>
      </div>
    </div>
  );
};

export default Card;
