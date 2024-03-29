import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../model/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
    activityRegistery = new Map<string, Activity>();

    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistery.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) 
        { 
            this.selectedActivity = activity;
        }
        else
        {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => this.selectedActivity = activity);
                this.setLoadingInitial(false);
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }

        return activity;

    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistery.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistery.get(id);
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistery.set(activity.id, activity);
                
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);

            runInAction(() => {
                this.activityRegistery.set(activity.id, activity);
                // this.activity = [...this.activities.filter(x => x.id !== activity.id), activity];
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                // this.activities = [...this.activities.filter(x => x.id !== id)];
                this.activityRegistery.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}