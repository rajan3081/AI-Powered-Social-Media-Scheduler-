import Calendar from "react-calendar";

function SchedulerCalendar({ posts }) {

  const tileContent = ({ date, view }) => {

    if (view === "month") {

      const dayPosts = posts.filter((post) => {

        const postDate = new Date(post.scheduledTime);

        return (
          postDate.toDateString() === date.toDateString()
        );

      });

      if (dayPosts.length > 0) {

        return (

          <div className="mt-1">

            <div className="
              bg-blue-500
              text-white
              text-xs
              rounded-full
              px-2
              py-1
              text-center
            ">
              {dayPosts.length} Posts
            </div>

          </div>

        );

      }

    }

  };

  return (

    <div className="
      bg-white
      rounded-3xl
      shadow-2xl
      p-6
    ">

      <h2 className="
        text-3xl
        font-bold
        mb-8
      ">
        Scheduler Calendar 📅
      </h2>

      <Calendar
        tileContent={tileContent}
        className="w-full border-none"
      />

    </div>

  );

}

export default SchedulerCalendar;