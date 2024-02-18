// shows up once submitted photo and response is generated.
import React, { useState } from "react";
import ImageCard from "../components/ImageCard.tsx";
import DescriptionCard from "../components/DescriptionCard.tsx";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";

const OutputPage: React.FC = () => {
  const [patientID] = React.useState<Id<"Patients"> | undefined>();

  const allGroups =
    useQuery(api.myFunctions.readJournalEntries, {
      PatientID: patientID || "",
    }) || [];

  return (
    <div>
      <ImageCard
        imageUrl={"https://picsum.photos/seed/picsum/200/300"}
        title={""}
        description={""}
      />
      <DescriptionCard description={"descr"} result={"result"} />
    </div>
  );
};

export default OutputPage;
