import { Badge } from "@/components/ui/badge"; // ✅ Correct import for badge component
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course?.courseThumbnail}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            {course?.courseTitle}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    course?.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {course?.creator?.name}
            </h1>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full ml-auto">
              {course?.courseLevel}
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>{course?.coursePrice}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
