"use client";

import Button from "@/components/common/Button";

const Category = () => {
  return (
    <div className="shapeBg p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h5>사교/인맥</h5>
          <div className="flex gap-2">
            <Button
              title="맛집"
              value
              type="label"
              onClick={(v) => {
                console.log("v", v);
              }}
            />
            <Button
              title="맛집"
              value={false}
              type="label"
              onClick={(v) => {
                console.log("v", v);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
