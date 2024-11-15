"use client";
import { useState } from "react";
import Button from "../common/Button";

interface State {
  recommend: boolean;
  distance: boolean;
  new: boolean;
  closingSoon: boolean;
}

const MainFilter = () => {
  const [selectedItems, setSelectedItems] = useState<State>({
    recommend: true,
    distance: false,
    new: false,
    closingSoon: false,
  });

  if (!selectedItems.recommend && !selectedItems.distance && !selectedItems.new && !selectedItems.closingSoon) {
    setSelectedItems({ recommend: true, distance: false, new: false, closingSoon: false });
  }

  return (
    <div id="mainFilter" className="flex items-center gap-1 bg-bg p-5 pb-0">
      <Button
        title="추천"
        custom="label"
        value={selectedItems.recommend}
        onClick={() => setSelectedItems({ recommend: !selectedItems.recommend })}
      />
      <Button
        title="가까운 순"
        custom="label"
        value={selectedItems.distance}
        onClick={() => setSelectedItems({ distance: !selectedItems.distance })}
      />
      <Button
        title="최신순"
        custom="label"
        value={selectedItems.new}
        onClick={() => setSelectedItems({ new: !selectedItems.new })}
      />
      <Button
        title="마감임박"
        custom="label"
        value={selectedItems.closingSoon}
        onClick={() => setSelectedItems({ closingSoon: !selectedItems.closingSoon })}
      />
    </div>
  );
};

export default MainFilter;
