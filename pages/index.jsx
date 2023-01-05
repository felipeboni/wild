import { userService } from 'services';
import { Link } from 'components';

import Avatar, { genConfig } from "react-nice-avatar";

export default Home;

function Home() {
    const config = genConfig(`${userService.userValue?.avatar}`);

    console.log(config);
    console.log(`${userService.userValue?.avatar}`);
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>firstName: {userService.userValue?.firstName}</h1>
                <h1>lastName: {userService.userValue?.lastName}</h1>
                <h1>username: {userService.userValue?.username}</h1>
                <h1>avatar: {userService.userValue?.avatar}</h1>
                <Avatar
                    className="w-32 h-32 ring-offset-4 ring-4 ring-primary-500 my-3"
                    {...config}
                />
                <p><Link href="/users">Manage Users</Link></p>
            </div>
        </div>
    );
}
