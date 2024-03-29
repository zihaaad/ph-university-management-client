import {TResponseRedux} from "../../../types";
import {TOfferedCourse} from "../../../types/studentCourseManagement";
import {baseApi} from "../../api/baseApi";

const studetnCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: () => ({
        url: "/offered-courses/my-offered-courses",
        method: "GET",
      }),
      transformResponse: (res: TResponseRedux<TOfferedCourse[]>) => {
        return {data: res.data, meta: res.meta};
      },
      providesTags: ["offeredCourse"],
    }),
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
    getMyEnrolledCourses: builder.query({
      query: () => ({
        url: "/enrolled-courses/my-enrolled-courses",
        method: "GET",
      }),
      transformResponse: (res: TResponseRedux<any>) => {
        return {data: res.data, meta: res.meta};
      },
      providesTags: ["offeredCourse"],
    }),
  }),
});

export const {
  useGetAllOfferedCoursesQuery,
  useEnrollCourseMutation,
  useGetMyEnrolledCoursesQuery,
} = studetnCourseApi;
