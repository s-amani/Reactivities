import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import LoadingComponent from '../../../app/layout/loadingComponent';


export default observer(function ActivityDashboard() {

    const { activityStore } = useStore(); 
    const { loadActivities, activityRegistery } = activityStore;

    useEffect(() => {
        if (activityRegistery.size <= 1) loadActivities();
    }, [activityStore, activityRegistery.size])

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activities Filters</h2>
            </Grid.Column>
        </Grid>
    )
})