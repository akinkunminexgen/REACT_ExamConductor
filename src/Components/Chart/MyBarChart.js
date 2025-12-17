import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { Card, CardBody, CardHeader } from "reactstrap";

export default function MyBarChart({ title, dataKey, courseData }) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="bg-light fw-semibold">
                {title}
            </CardHeader>

            <CardBody style={{ height: "300px", minHeight: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={courseData}>
                        <XAxis dataKey={dataKey[0] }/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={dataKey[1]} fill="#198754" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
}
