import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle,setCourseTitle] = useState("");
  const [category,setCategory] = useState("");
  const navigate = useNavigate();
  const [createCourse,{data,isLoading,error,isSuccess}] = useCreateCourseMutation();
  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const createCourseHandler = async () => {
    await createCourse({courseTitle,category});
  };
  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "Course Created Successfully");
      navigate('/admin/course')
    }
  },[isSuccess,error])
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic details
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, id!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value = {courseTitle}
            onChange = {(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange = {getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nextjs">Next JS</SelectItem>
              <SelectItem value="data science">Data Science</SelectItem>
              <SelectItem value="frontend development">Frontend Development</SelectItem>
              <SelectItem value="fullstack development">Fullstack Development</SelectItem>
              <SelectItem value="mern stack development">MERN Stack Development</SelectItem>
              <SelectItem value="backend development">Backend Development</SelectItem>
              <SelectItem value="javascript">Javascript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="docker">Docker</SelectItem>
              <SelectItem value="mongodb">MongoDB</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={()=>navigate('/admin/course')}>Back</Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {
              isLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please Wait
                </>
              ) : "Create"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
