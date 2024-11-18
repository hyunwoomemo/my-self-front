"use client";

import Button from "@/components/common/Button";
import { selectedCategoryAtom } from "@/store/meeting/category/atom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

interface CategoryProps {
  dataCategory1: dataProps[];
  dataCategory2: dataProps[];
}

interface dataProps {
  id: number;
  name: string;
  parent_id: number | null;
}

const Category = ({ dataCategory1, dataCategory2 }: CategoryProps) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const handleClick = (v1: dataProps, v2: dataProps) => {
    if (selectedCategory && selectedCategory.c2_id === v2.id) {
      setSelectedCategory({ c1_id: -1, c1_name: "", c2_id: -1, c2_name: "" });
    } else {
      setSelectedCategory({ c1_id: v1.id, c1_name: v1.name, c2_id: v2.id, c2_name: v2.name });
    }
  };

  return (
    <div className="shapeBg flex flex-1 flex-col justify-between p-6">
      <div className="flex flex-col gap-4">
        {dataCategory1 &&
          dataCategory1.map((c1: dataProps) => {
            return (
              <div key={c1.id} className="flex flex-col gap-2">
                <h5>{c1.name}</h5>
                <div className="flex flex-wrap gap-2">
                  {dataCategory2 &&
                    dataCategory2
                      .filter((c2: dataProps) => c2.parent_id === c1.id)
                      .map((c2: dataProps) => {
                        return (
                          <Button
                            key={c2.id}
                            title={c2.name}
                            on={selectedCategory && c2.id === selectedCategory.c2_id}
                            custom="label"
                            onClick={() => handleClick(c1, c2)}
                          />
                        );
                      })}
                </div>
              </div>
            );
          })}
      </div>
      <div className="pt-9">
        <Button onClick={() => router.push("/create/write")} title="다음" custom="full" />
      </div>
    </div>
  );
};

export default Category;
