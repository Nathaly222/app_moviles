import React, { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import {
    createRickAndMortFetch,
    rickAndMortyEpisodes,
    updateRickAndMortyFetch,
} from '../services/rickAndMorty';
import { EpisodeData } from '../pages/Episodes';
import {Button, Col, Drawer, Form, FormInstance, Input, Row} from 'antd';

type DrawerType = {
    open: boolean;
    setOpen: any;
    fields?: EpisodeData;
};

export const AntDrawer: React.FC<DrawerType> = ({open, setOpen, fields}: DrawerType) => {
    const [form] = Form.useForm();
    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };
    const onFinish = async (values: EpisodeData) => {
        values.episode = Number(values.episode);
        await trigger(values);
        onClose();
    };

    useEffect(() => {
        form.setFieldsValue(fields);
    }, [fields, form]);

    const { trigger, isMutating } = useSWRMutation(
        fields ? `${rickAndMortyEpisodes}/${fields.id}` : rickAndMortyEpisodes,
        fields ? updateRickAndMortyFetch : createRickAndMortFetch
    );

    return (
        <Drawer
            title="Create a new"
            width={720}
            onClose={onClose}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <FormSection form={form} loading={isMutating} onFinish={onFinish} />
        </Drawer>
    );
};



type FormType = {
 form:FormInstance;
 loading: boolean;
 onFinish: any
}
const FormSection: React.FC<FormType> = ({ form, loading, onFinish }) => (
    <Form
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
        form={form}
    >
        <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                >
                    <Input placeholder="Please enter user name" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="episode"
                    label="Episode"
                    rules={[{ required: true, message: 'Please enter a episode' }]}
                >
                    <Input placeholder="Please enter a episode" />
                </Form.Item>
            </Col>
        </Row>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Save
            </Button>
        </Form.Item>
    </Form>
)
