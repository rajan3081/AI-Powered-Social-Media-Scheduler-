import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Analytics({ posts }) {

  const data = [
    {
      name: "Published",
      value: posts.filter(
        (post) => post.status === "published"
      ).length
    },
    {
      name: "Scheduled",
      value: posts.filter(
        (post) => post.status !== "published"
      ).length
    }
  ];

  return (

    <div className="
      bg-white
      dark:bg-gray-800
      rounded-3xl
      shadow-2xl
      p-6
      mb-10
    ">

      <h2 className="
        text-3xl
        font-bold
        mb-8
      ">
        Analytics 📊
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default Analytics;