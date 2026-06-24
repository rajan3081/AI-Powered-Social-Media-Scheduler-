import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
PieChart,
Pie
} from "recharts";

function Analytics({ posts = [] }) {

// BAR CHART DATA

const data = [

{
  name: "Published",
  value: posts.filter(
    (post) =>
      post?.status === "published"
  ).length
},

{
  name: "Scheduled",
  value: posts.filter(
    (post) =>
      post?.status !== "published"
  ).length
}

];

// PIE CHART DATA

const pieData = [

{
  name: "Instagram",
  value: posts.filter(
    (post) =>
      post?.platform === "Instagram"
  ).length
},

{
  name: "LinkedIn",
  value: posts.filter(
    (post) =>
      post?.platform === "LinkedIn"
  ).length
},

{
  name: "Facebook",
  value: posts.filter(
    (post) =>
      post?.platform === "Facebook"
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

  {/* BAR CHART */}

  <div className="h-80">

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <BarChart data={data}>

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#3b82f6"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  {/* PIE CHART */}

  <div className="
    h-96
    mt-10
  ">

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <PieChart>

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          fill="#8884d8"
          label
        />

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

);

}

export default Analytics;
