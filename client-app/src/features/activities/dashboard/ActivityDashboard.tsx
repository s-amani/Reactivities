import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];

  selectedActivity: IActivity | null;
  editMode: boolean;

  setEditMode: (editMode: boolean) => void;
  selectActivity: (id: string) => void;
  setSelectedActivity: (activity: IActivity | null) => void;

  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;

}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectedActivity,
  editMode,

  setEditMode,
  selectActivity,
  setSelectedActivity,

  createActivity,
  editActivity,
  deleteActivity
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList deleteActivity={deleteActivity} activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={selectedActivity?.id || 0}
            activity={selectedActivity!}
            setEditMode={setEditMode}
            createActivity={createActivity}
            editActivity={editActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
