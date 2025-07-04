import express from "express";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureByID, getPublishedCourses, removeLecture, searchCourse, togglePublishCourse } from "../controllers/CourseController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/").post(isAuthenticated,createCourse)
router.route("/search").get(isAuthenticated,searchCourse);
router.route("/published-courses").get(getPublishedCourses)
router.route("/").get(isAuthenticated,getCreatorCourses)
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.route("/:courseId").get(isAuthenticated,getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated,createLecture);
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture);
router.route("/:courseId/lecture/:lectureId").get(isAuthenticated,getLectureByID);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture);
router.route("/:courseId/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/:courseId").patch(isAuthenticated,togglePublishCourse);


export default router;