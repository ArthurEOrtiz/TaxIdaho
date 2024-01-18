import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { SchoolInfo } from "./components/SchoolInfo";
import { Calendar } from "./components/Calendar";
import { CourseDescription } from "./components/CourseDescription";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/school-info',
    element: <SchoolInfo />
  },
  {
    path: '/calendar',
    element: <Calendar />
  },
  {
    path: '/course-description',
    element: <CourseDescription />
  }
];

export default AppRoutes;
