import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Table from '../Components/Table'
import UserDetail from '../Components/UserDetail.js'
import Posts from '../Components/Posts'
import Comments from '../Components/Comments'


export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Table} />
                <Route exact path="/posts:Id" component={Posts} />
                <Route path="/user:id" component={UserDetail} />
                <Route path="/comments:postId" component={Comments} />
            </Switch>
        </Router>
    )
}
