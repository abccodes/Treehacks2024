import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface ContainerProps {
  // Define your component props here
}

const Container: React.FC<ContainerProps> = () => {
  // Implement your component logic here
  const addJournalEntry = useMutation(api.myFunctions.addJournalEntry);

  // const [dateLogged, setDateLogged] = React.useState({ Date: "" });
  // const [notes, setNotes] = React.useState("");
  // const [patientID, setPatientID] = React.useState("");
  // const [storageID, setStorageID] = React.useState("");

  // // @dev
  // // ConditionID: v.id("Conditions"),
  // // DateLogged: v.object({ Date: v.string() }),
  // // Notes: v.string(),
  // // PatientID: v.id("Patients"),

  // async function handleUpload() {
  //   try {
  //     await addJournalEntry({
  //       DateLogged: dateLogged,
  //       Notes: notes,
  //       PatientID: patientID, // Ensure patientID is of type Id<"Patients">
  //       StorageID: storageID, // Also treated as a string
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>
            Upload thing here or replace whole card
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Container;
