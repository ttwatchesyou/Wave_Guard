import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import GaugeChart from "react-gauge-chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Statistic, Card } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";

import { useMqttTemp } from "../../hook/useMqttTemp";
import { useMqttFlow } from "../../hook/useMqttFlow";
import { useMqttStatus } from "../../hook/useMqttStatus";
import { MqttControlButtons } from "../../components/Button/MqttControlButtons";

function MainPartSection() {
  const temp = useMqttTemp();
  const flow = useMqttFlow();
  const status = useMqttStatus(); // ✅ สถานะปั๊ม ON/OFF

  const [displayTemp, setDisplayTemp] = useState<number>(0);
  const [displayFlow, setDisplayFlow] = useState<number>(0);

  const [tempSeries, setTempSeries] = useState<Array<any>>([]);
  const [flowSeries, setFlowSeries] = useState<Array<any>>([]);
  const maxPoints = 120;

  const lastTempRef = useRef<number | null>(null);
  const lastFlowRef = useRef<number | null>(null);

  // Pop-up alerts
  const [popUps, setPopUps] = useState<
    Array<{ id: number; message: string; status: string }>
  >([]);
  const popUpId = useRef<number>(0);

  // smoothing Temp
  useEffect(() => {
    if (temp == null) return;
    const factor = 0.12;
    const interval = setInterval(() => {
      setDisplayTemp((prev) => {
        const diff = temp - prev;
        if (Math.abs(diff) < 0.05) return temp;
        return prev + diff * factor;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [temp]);

  // smoothing Flow
  useEffect(() => {
    if (flow == null) return;
    const factor = 0.12;
    const interval = setInterval(() => {
      setDisplayFlow((prev) => {
        const diff = flow - prev;
        if (Math.abs(diff) < 0.05) return flow;
        return prev + diff * factor;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [flow]);

  // series Temp
  useEffect(() => {
    if (temp == null) return;
    const now = new Date();
    if (lastTempRef.current !== temp) {
      lastTempRef.current = temp;
      setTempSeries((s) =>
        [...s, { time: now.toLocaleTimeString(), value: Number(temp) }].slice(
          -maxPoints
        )
      );
    }
  }, [temp]);

  // series Flow
  useEffect(() => {
    if (flow == null) return;
    const now = new Date();
    if (lastFlowRef.current !== flow) {
      lastFlowRef.current = flow;
      setFlowSeries((s) =>
        [...s, { time: now.toLocaleTimeString(), value: Number(flow) }].slice(
          -maxPoints
        )
      );
    }
  }, [flow]);

  // thresholds
  const TEMP_WARNING = 70;
  const TEMP_DANGER = 85;
  const FLOW_LOW = 70;
  const FLOW_CRITICAL = 10;

  const tempStatus =
    displayTemp >= TEMP_DANGER
      ? "danger"
      : displayTemp >= TEMP_WARNING
      ? "warning"
      : "normal";

  const flowStatus =
    displayFlow <= FLOW_CRITICAL
      ? "danger"
      : displayFlow <= FLOW_LOW
      ? "warning"
      : "normal";

  // Alert status for card background
  const getAlertStatus = () => {
    if (tempStatus === "danger" || flowStatus === "danger") return "danger";
    if (tempStatus === "warning" || flowStatus === "warning") return "warning";
    return "normal";
  };

  // Pop-up alerts
  useEffect(() => {
    const messages: Array<{ message: string; status: string }> = [];
    if (tempStatus === "danger")
      messages.push({
        message: `อุณหภูมิสูงเกิน ${TEMP_DANGER} °C`,
        status: "danger",
      });
    else if (tempStatus === "warning")
      messages.push({
        message: `อุณหภูมิเกิน ${TEMP_WARNING} °C`,
        status: "warning",
      });

    if (flowStatus === "danger")
      messages.push({
        message: `Flow ต่ำกว่า ${FLOW_CRITICAL} L/min`,
        status: "danger",
      });
    else if (flowStatus === "warning")
      messages.push({
        message: `Flow ต่ำกว่า ${FLOW_LOW} L/min`,
        status: "warning",
      });

    messages.forEach((msg) => {
      popUpId.current += 1;
      const id = popUpId.current;
      setPopUps((prev) => [
        ...prev,
        { id, message: msg.message, status: msg.status },
      ]);
      // remove after 5 sec
      setTimeout(() => {
        setPopUps((prev) => prev.filter((p) => p.id !== id));
      }, 5000);
    });
  }, [tempStatus, flowStatus]);

  return (
    <MainSection>
      <MainBox>
        <Header>
          <Title>WAVE GUARD DASHBOARD</Title>
          <Subtitle>Realtime from MQTT</Subtitle>
        </Header>
        <Row gutter="l">
          <Col span={12} gutter="l">
            <GaugeCard>
              <CardTitle>WIND SPEED</CardTitle>
              <GaugeWrapper>
                <GaugeChart
                  id="temp-gauge"
                  nrOfLevels={20}
                  percent={Math.max(0, Math.min(1, displayTemp / 10))}
                  colors={["#00FF00", "#FFBF00", "#FF0000"]}
                  animate={false}
                  hideText={true} // ซ่อนตัวเลขเดิม
                />
                <TempValue>{displayTemp.toFixed(1)}m/s</TempValue>
              </GaugeWrapper>
              <StatusRow>
                <StatusDot status={tempStatus} />
                <StatusText>
                  {tempStatus === "danger"
                    ? "อุณหภูมิสูงมาก"
                    : tempStatus === "warning"
                    ? "อุณหภูมิสูง"
                    : "ปกติ"}
                </StatusText>
              </StatusRow>
            </GaugeCard>
          </Col>

          <Col span={12} gutter="l">
            <GaugeCard>
              <CardTitle>WAVE COUNTING</CardTitle>
              <GaugeWrapper
                style={{
                  minHeight: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Statistic
                  title={null}
                  value={displayFlow.toFixed(0)}
                  prefix={
                    <ThunderboltOutlined
                      style={{ color: "#00e6ff", fontSize: 32, marginRight: 8 }}
                    />
                  }
                  suffix="ครั้ง"
                  valueStyle={{ color: "#fff", fontSize: "3rem" }}
                />
              </GaugeWrapper>
              <StatusRow>
                <StatusDot status={flowStatus} />
                <StatusText>
                  {flowStatus === "danger"
                    ? "จำนวนคลื่นต่ำมาก"
                    : flowStatus === "warning"
                    ? "จำนวนคลื่นต่ำ"
                    : "ปกติ"}
                </StatusText>
              </StatusRow>
            </GaugeCard>
          </Col>
        </Row>

        {/* Row 2 : Charts */}
        <Row gutter="l">
          <Col span={12} gutter="l">
            <ChartCard>
              <CardTitle>Wind Trend</CardTitle>
              <ChartArea>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={tempSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" minTickGap={20} />
                    <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      dot={false}
                      stroke="#ffcc00"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartArea>
            </ChartCard>
          </Col>
          <Col span={12} gutter="l">
            <ChartCard>
              <CardTitle>Wave Trend</CardTitle>
              <ChartArea>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={flowSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" minTickGap={20} />
                    <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      dot={false}
                      stroke="#00e6ff"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartArea>
            </ChartCard>
          </Col>
        </Row>

        {/* Row 3 : Status Cards */}
        <Row gutter="l">
          <Col span={6} gutter="l">
            <SmallCard>
              <SmallTitle>Latest Wind</SmallTitle>
              <SmallValue>{displayTemp.toFixed(1)} m/s</SmallValue>
              <SmallNote>
                Threshold: {TEMP_WARNING} / {TEMP_DANGER} m/s
              </SmallNote>
            </SmallCard>
          </Col>
          <Col span={6} gutter="l">
            <SmallCard>
              <SmallTitle>Latest Wave</SmallTitle>
              <SmallValue>{displayFlow.toFixed(2)} ครั้ง</SmallValue>
              <SmallNote>
                Low: {FLOW_LOW} / {FLOW_CRITICAL}ครั้ง
              </SmallNote>
            </SmallCard>
          </Col>
          {/* <Col span={6} gutter="l">
            ✅ แสดงสถานะปั๊ม
            <SmallCard>
              <SmallTitle>Pump Status</SmallTitle>
              <SmallValue>
                {status === "ON" ? "กำลังทำงาน" : "หยุดทำงาน"}
              </SmallValue>
              <SmallNote>MQTT: Pump/Status</SmallNote>
            </SmallCard>
          </Col> */}
          {/* <Col span={6} gutter="l">
            <AlertCard status={getAlertStatus()}>
              <AlertTitle>Alerts</AlertTitle>
              <AlertList>
                {tempStatus === "danger" && (
                  <li>อุณหภูมิสูงเกิน {TEMP_DANGER} °C</li>
                )}
                {tempStatus === "warning" && (
                  <li>อุณหภูมิเกิน {TEMP_WARNING} °C</li>
                )}
                {flowStatus === "danger" && (
                  <li>Flow ต่ำกว่า {FLOW_CRITICAL} L/min</li>
                )}
                {flowStatus === "warning" && (
                  <li>Flow ต่ำกว่า {FLOW_LOW} L/min</li>
                )}
                {tempStatus === "normal" && flowStatus === "normal" && (
                  <li>สภาพปกติ</li>
                )}
              </AlertList>
            </AlertCard>
          </Col> */}
        </Row>

        {/* --- ปุ่มควบคุม --- */}
        <Row gutter="l">
          <Col span={12}>
            <MqttControlButtons disableOn={status === "ON"} />
          </Col>
        </Row>

        {/* Pop-up Alerts */}
        <PopUpContainer>
          {popUps.map((p) => (
            <PopUp key={p.id} status={p.status}>
              {p.message}
            </PopUp>
          ))}
        </PopUpContainer>
      </MainBox>
    </MainSection>
  );
}

export default MainPartSection;

// ================== Styled Components ==================

const TempValue = styled.div`
  margin-top: -20px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 2rem;
`;

const FlowValue = styled.div`
  margin-top: -20px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 2rem;
`;

const MainSection = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  padding-top: 104px;
  background-color: #fffbde;
  display: flex;
  justify-content: center;
`;

const MainBox = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #1e3271;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffdc7c;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #ffffffcc;
  margin: 6px 0 0;
`;

/* ------------------ Grid ------------------ */
const gutterMap: Record<string, number> = {
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

const Row = styled.div<{ gutter?: number | "s" | "m" | "l" | "xl" }>`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${(p) => (typeof p.gutter === "string" ? gutterMap[p.gutter] / 2 : (p.gutter ?? 0) / 2)}px;
  margin-right: -${(p) => (typeof p.gutter === "string" ? gutterMap[p.gutter] / 2 : (p.gutter ?? 0) / 2)}px;
`;

const Col = styled.div<{
  span?: number;
  gutter?: number | "s" | "m" | "l" | "xl";
}>`
  padding-left: ${(p) =>
    typeof p.gutter === "string"
      ? gutterMap[p.gutter] / 2
      : (p.gutter ?? 0) / 2}px;
  padding-right: ${(p) =>
    typeof p.gutter === "string"
      ? gutterMap[p.gutter] / 2
      : (p.gutter ?? 0) / 2}px;
  flex: 0 0 ${(p) => (p.span ? (p.span / 24) * 100 : 100)}%;
  max-width: ${(p) => (p.span ? (p.span / 24) * 100 : 100)}%;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 24px;
  }
`;

/* ------------------ Cards ------------------ */
const GaugeCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  padding: 12px;
  border-radius: 10px;
  text-align: center;
`;

const CardTitle = styled.div`
  color: #fff;
  font-weight: 600;
  margin-bottom: 6px;
`;

const GaugeWrapper = styled.div`
  max-width: 360px;
  margin: 0 auto;
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

const StatusDot = styled.span<{ status: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(p) =>
    p.status === "danger"
      ? "#ff4d4f"
      : p.status === "warning"
      ? "#ffbf00"
      : "#52c41a"};
`;

const StatusText = styled.span`
  color: #fff;
`;

const ChartCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  padding: 12px;
  border-radius: 10px;
`;

const ChartArea = styled.div`
  height: 220px;
`;

const SmallCard = styled.div`
  background: #122049;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  max-height: 80px;
`;

const SmallTitle = styled.div`
  font-size: 0.95rem;
  color: #ffdc7c;
`;

const SmallValue = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`;

const SmallNote = styled.div`
  font-size: 0.8rem;
  color: #fffccc;
`;

/* ------------------ Alert ------------------ */
interface AlertCardProps {
  status?: "normal" | "warning" | "danger";
}

const AlertCard = styled.div<AlertCardProps>`
  background: ${(p) =>
    p.status === "danger"
      ? "#ff4d4f"
      : p.status === "warning"
      ? "#ffa940"
      : "#52c41a"};
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  transition: background 0.3s ease;
  min-height: 80px;
`;

const AlertTitle = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
`;

const AlertList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #ffd9d9;
  li {
    margin-bottom: 6px;
  }
`;

/* ------------------ Pop-up ------------------ */
const popUpAnim = keyframes`
  0% { transform: translateY(-20px); opacity: 0; }
  10% { transform: translateY(0); opacity: 1; }
  90% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-20px); opacity: 0; }
`;

const PopUpContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 999;
`;

const PopUp = styled.div<{ status: string }>`
  background: ${(p) =>
    p.status === "danger"
      ? "#ff4d4f"
      : p.status === "warning"
      ? "#ffa940"
      : "#52c41a"};
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  animation: ${popUpAnim} 5s forwards;
`;
