import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Button, Descriptions, Space, Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
  </Descriptions>
);

export default () => {
  const [responsive, setResponsive] = useState(false);
  // @ts-ignore
  return (
    <PageContainer
      content={content}
      tabList={[
        {
          tab: '详细信息',
          key: 'info',
        },
      ]}
      extraContent={
        <Space size={24}>
          <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
          <Statistic title="Unmerged" value={93} suffix="/ 100" />
        </Space>
      }
      extra={[
        <Button key="3">操作</Button>,
        <Button key="2">操作</Button>,
        <Button key="1" type="primary">
          主操作
        </Button>,
      ]}
    >
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard split={responsive ? 'horizontal' : 'vertical'}>
          <StatisticCard
            colSpan={responsive ? 24 : 6}
            title="财年业绩目标"
            statistic={{
              value: 82.6,
              suffix: '亿',
              // @ts-ignore
              description: <Statistic title="日同比" value="6.47%" trend="up" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
                alt="进度条"
                width="100%"
              />
            }
            footer={
              <>
                <Statistic value="70.98%" title="财年业绩完成率" />
                <Statistic value="86.98%" title="去年同期业绩完成率" />
                <Statistic value="88.98%" title="前年同期业绩完成率" />
              </>
            }
          />
          <StatisticCard.Group
            colSpan={responsive ? 24 : 18}
            direction={responsive ? 'column' : undefined}
          >
            <StatisticCard
              statistic={{
                title: '财年总收入',
                value: 601987768,
                // @ts-ignore

                description: <Statistic title="日同比" value="6.15%" trend="up" />,
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >
              <Statistic
                title="大盘总收入"
                value={1982312}
                // @ts-ignore

                layout="vertical"
                // @ts-ignore

                description={<Statistic title="日同比" value="6.15%" trend="down" />}
              />
            </StatisticCard>
            <StatisticCard
              statistic={{
                title: '当日排名',
                value: 6,
                // @ts-ignore

                description: <Statistic title="日同比" value="3.85%" trend="down" />,
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >
              <Statistic
                title="近7日收入"
                value={17458}
                // @ts-ignore

                layout="vertical"
                // @ts-ignore

                description={<Statistic title="日同比" value="6.47%" trend="up" />}
              />
            </StatisticCard>
            <StatisticCard
              statistic={{
                title: '财年业绩收入排名',
                value: 2,
                // @ts-ignore

                description: <Statistic title="日同比" value="6.47%" trend="up" />,
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >
              <Statistic
                title="月付费个数"
                value={601}
                // @ts-ignore

                layout="vertical"
                // @ts-ignore

                description={<Statistic title="日同比" value="6.47%" trend="down" />}
              />
            </StatisticCard>
          </StatisticCard.Group>
        </ProCard>
      </RcResizeObserver>
      <br />
      <h1>更多功能开发中，敬请期待！</h1>
    </PageContainer>
  );
};
