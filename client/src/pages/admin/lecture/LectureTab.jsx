import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIDQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
const MEDIA_API = "http://localhost:8080/api/v1/media/upload-video";

const LectureTab = () => {
  const params = useParams();
  const { courseId, lectureId } = params;
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setisFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [btnDisable, setbtnDisable] = useState(true);
  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [removeLecture, {data:removeData,isLoading:removeLoading, isSuccess:removeSuccess}] =
    useRemoveLectureMutation();
  const removeLectureHandler = async () => {
    await removeLecture({courseId,lectureId});
  };
  const {data:lectureData} = useGetLectureByIDQuery({courseId,lectureId});
  const lecture = lectureData?.lecture;
  useEffect(()=>{
    if(lecture){
      setTitle(lecture.lectureTitle);
      // setisFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  },[lecture])
  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle: title,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
    }
  }, [removeSuccess]);
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setuploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setbtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };
  return (
    <Card>
      <CardHeader className="flex flex-col justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" disabled={removeLoading} onClick={removeLectureHandler}>
            {
              removeLoading ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/> 
              Please wait
              </> : "Remove Lecture"
            }
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Introduction to Js"
          />
        </div>
        <div className="my-5">
          <Label>
            Video<span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            checked={isFree}
            onCheckedChange={setisFree}
          />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button disabled={isLoading} onClick={editLectureHandler}>
            {
              isLoading ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Please Wait
              </> : "Update Lecture"
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
