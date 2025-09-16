"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import { CourseType } from "~/schemaValidate/course.schema";

const ButtonActionCourse = ({ courseInit }: { courseInit: CourseType }) => {
    console.log("courseInit >>", courseInit);

    return (
        <>
            <Button className="text-primary mt-2 w-full" variant={"outline"}>
                <span>Mua ngay</span>
            </Button>
        </>
    );
};

export default ButtonActionCourse;
