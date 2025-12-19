import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    CardHeader,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Alert,
    Spinner,
    Badge
} from "reactstrap";
import Body from "../../components/Panels/Body";
import { FaUserGraduate, FaBook, FaClipboardList, FaChartBar, FaClock, FaBell } from "react-icons/fa";
import MyLineChart from "../../components/Chart/MyLineChart";
import MyBarChart from "../../components/Chart/MyBarChart";
import GlobalLoader from "../../components/Common/GlobalLoader";
import { useLoading } from "../../context/LoadingContext";
import { getKeysForChart } from "../../helper/XYkeys";

export default function AdminDashboard() {
    const { loading, setLoading } = useLoading();
    const [data, setData] = useState({
        stats: {
            students: 0,
            courses: 0,
            activeExams: 0,
            pendingSubmissions: 0
        },
        enrollmentData: [],
        courseData: [],
        alerts: [],
        activities: []
    });

   useEffect(() => {
       // Simulate API call
       setLoading(true);
    setTimeout(() => {
      setData({
        stats: {
          students: 420,
          courses: 24,
          activeExams: 6,
          pendingSubmissions: 18
        },
        alerts: [
          { id: 1, text: "Physics Exam closes today", type: "danger" },
          { id: 2, text: "Chemistry Exam closes in 2 days", type: "warning" }
        ],
          activities: [
              {
                  id: 1,
                  action: "Akin enrolled in Mathematics",
                  date: "2025-09-16T10:15:00"
              },
              {
                  id: 2,
                  action: "John submitted submitted",
                  date: "2025-09-15T18:42:00"
              }
          ],
          courseData : [
              { course: "Math", students: 120 },
              { course: "Physics", students: 90 },
              { course: "Chemistry", students: 70 }
          ],
          enrollmentData: [
              { month: "Jan", students: 120 },
              { month: "Feb", students: 180 },
              { month: "Mar", students: 260 },
              { month: "Apr", students: 310 }
          ]
      });
      setLoading(false);
    }, 900);
   }, []);

    const timeAgo = (date) => {
        const diff = Math.floor((Date.now() - new Date(date)) / 60000);
        if (diff < 1) return "Just now";
        if (diff < 60) return `${diff} min ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
        return new Date(date).toLocaleDateString();
    };


    return (
        <>
            {loading && <GlobalLoader />}
            <Body>
                <h4 className="mb-4 fw-semibold">Admin Dashboard</h4>

                {/* STAT CARDS */}
                <Row className="g-4">
                    <DashboardCard
                        title="Students"
                        value={data.stats.students}
                        icon={<FaUserGraduate />}
                        color="primary"
                    />
                    <DashboardCard
                        title="Courses"
                        value={data.stats.courses}
                        icon={<FaBook />}
                        color="success"
                    />
                    <DashboardCard
                        title="Active Exams"
                        value={data.stats.exams}
                        icon={<FaClipboardList />}
                        color="warning"
                    />
                    <DashboardCard
                        title="Enrollments"
                        value={data.stats.enrollments}
                        icon={<FaChartBar />}
                        color="info"
                    />
                </Row>

                {/* ================== ALERTS ================== */}
                <Row className="mt-3">
                    <Col md="12">
                        <Card className="shadow-sm">
                            <CardHeader className="fw-semibold d-flex align-items-center gap-2">
                                <FaBell />
                                Alerts
                            </CardHeader>
                            <CardBody>
                                {data.alerts.map(a => (
                                    <Alert key={a.id} color={a.type} className="mb-2">
                                        {a.text}
                                    </Alert>
                                ))}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {/* ================== CHART + ACTIVITY ================== */}
                {data.enrollmentData?.length > 0 ? (
                    <Row className="mb-3 g-4">
                        {/* Enrollment Trend */}
                        <Col lg="5" md="12" sm={12} className="mt-3">
                            <MyLineChart title={"Student Enrollment"} dataKey={getKeysForChart(data.enrollmentData)} enrollmentData={data.enrollmentData} />                               
                        </Col>
                        {/* Course Trend */}
                        <Col lg="5" md="12" sm={12} className="mt-3">
                            <MyBarChart title={"Course Popularity"} dataKey={getKeysForChart(data.courseData)} courseData={data.courseData} />
                        </Col>

                        {/* Recent Activity */}
                        <Col lg="2" md="12" sm={12} className="mt-3">
                            <Card className="shadow-sm h-100">
                                <CardHeader className="fw-semibold">
                                    Recent Activity
                                </CardHeader>
                                <CardBody>
                                    <ListGroup flush>
                                        {data.activities.map((a) => (
                                            <ListGroupItem key={a.id} className="px-0">
                                                {a.action}
                                                <Badge color="light" className="float-end text-muted">
                                                    {timeAgo(a.date)}
                                                </Badge>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <div className="text-center text-muted">
                        No data available
                    </div>
                )}


                
            </Body>
        </>
        
    );
}



function DashboardCard({ title, value, icon, color }) {
    return (
        <Col md="6" lg="3">
            <Card className="shadow-sm h-100">
                <CardBody className="d-flex justify-content-between align-items-center">
                    <div>
                        <CardTitle tag="h6" className="text-muted">
                            {title}
                        </CardTitle>
                        <h3 className="fw-bold mb-0">{value}</h3>
                    </div>

                    <div
                        className={`bg-${color}-subtle text-${color} rounded-circle d-flex align-items-center justify-content-center`}
                        style={{
                            width: "52px",
                            height: "52px",
                            fontSize: "1.3rem",
                            backgroundColor: "rgba(13,110,253,0.1)" // fallback
                        }}
                    >
                        {icon}
                    </div>

                </CardBody>
            </Card>
        </Col>
    );
}

function StatCard({ title, value, icon }) {
    return (
        <Col md="6" lg="3">
            <Card className="shadow-sm h-100">
                <CardBody className="d-flex justify-content-between align-items-center">
                    <div>
                        <small className="text-muted">{title}</small>
                        <h3 className="fw-bold mb-0">{value}</h3>
                    </div>
                    <div className="text-primary fs-4">{icon}</div>
                </CardBody>
            </Card>
        </Col>
    );
}
