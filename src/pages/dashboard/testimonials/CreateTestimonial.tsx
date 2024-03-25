/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import {TResponse, TTestimonial} from "../../../types";
import {testimonialSchema} from "./zodTestimonialValidation";
import {useAppSelector} from "../../../redux/hooks";
import {currentUser, currentUsername} from "../../../redux/features/auth/authSlice";
import {useAddTestimonialMutation} from "../../../redux/features/testimonials/testimonialApi";

const CreateTestimonial = () => {
  const user = useAppSelector(currentUser)
  const username = useAppSelector(currentUsername)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(testimonialSchema) });

  const [addTestimonial] = useAddTestimonialMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Posting testimonial ...')
    try {
      const testimonialData = {
        username,
        email: user?.email,
        ...data
      }
      const res = await addTestimonial(testimonialData) as TResponse<TTestimonial>;
      if(res?.error){
        throw new Error(res?.error?.data?.message) 
      }
      reset();
      toast.success("Successfully created new testimonial", { id: toastId, duration: 2000 });
    } catch (err : any) {
      toast.error(err?.message ? err.message : "Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="px-4 sm:px-10 py-10">
      <div className="bg-white dark:bg-gray-800 w-full max-w-[100%] lg:max-w-[80%] border border-gray-200 dark:border-gray-800 shadow-md rounded-lg py-5 sm:py-8 px-4 sm:px-14">
        <h5 className="text-lg font-medium mb-4">Add Testimonial</h5>
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="text-sm">Name/username</label>
              <br />
              <input
                id="username"
                {...register("username")}
                value={username as string}
                type="text"
                className="custom-input"
                placeholder="Enter title"
              />
              {errors?.username && (
                <span className="text-xs text-red-500">
                  {errors.username.message as string}
                </span>
              )}
            </div>
            <div>
              <label className="text-sm">Email</label>
              <br />
              <input
                id="email"
                {...register("email")}
                value={user?.email}
                type="text"
                className="custom-input"
              />
              {errors?.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message as string}
                </span>
              )}
            </div>
            <div>
              <label className="text-sm">Name/Organization Name</label>
              <br />
              <input
                id="name"
                {...register("name")}
                type="text"
                className="custom-input" placeholder="Enter your name or organization name"
              />
              {errors?.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message as string}
                </span>
              )}
            </div>
            <div>
              <label className="text-sm">Address</label>
              <br />
              <input
                id="address"
                {...register("address")}
                type="text"
                className="custom-input"
                placeholder="Enter Address"
              />
              {errors?.address && (
                <span className="text-xs text-red-500">
                  {errors.address.message as string}
                </span>
              )}
            </div>
            <div className="">
              <label className="text-sm">Testimonial Description</label>
              <br />
              <textarea
                {...register("testimonial")}
                id="testimonial"
                rows={3}
                placeholder="Enter description"
                className="custom-input"
              ></textarea>
              {errors?.testimonial && (
                <span className="text-xs text-red-500">
                  {errors.testimonial.message as string}
                </span>
              )}
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-solid">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTestimonial;
