import {ColumnsType} from "antd/es/table";
import useSWR from "swr";
import {fetchRickAndMorty, rickAndMortyEpisodes} from "../services/rickAndMorty";
import { Space, Table, Button, Typography  } from 'antd';
import React, {useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import {AntDrawer} from "../components/AntDrawer";

export interface EpisodeData {
    id: number | string;
    name: string;
    episode:number
}

export const Episodes: React.FC  = () => {
    const columns: ColumnsType<EpisodeData> = [
        {
            title: 'id',
            dataIndex:'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Episodios',
            dataIndex: 'episode',
            key: 'episode',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Typography.Link onClick={()=>fieldsEdit(record)} style={{ marginRight: 8 }}>
                        Editar
                    </Typography.Link>
                    <Typography.Link  style={{ marginRight: 8 }}>
                        Eliminar
                    </Typography.Link>

                </Space>
            ),
        },
    ];

    const [editingData, setEditingData] = useState<EpisodeData | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const fieldsEdit = (field: EpisodeData) => {
        setEditingData(field)
        setOpen(true);
    }
    const showDrawer = () => {
        setEditingData(undefined)
        setOpen(true);
    };

    const { data, error } = useSWR<EpisodeData[]>(rickAndMortyEpisodes, fetchRickAndMorty, {
            suspense: false,
    });


        return(
            <>
                <AntDrawer open={open} setOpen={setOpen} fields={editingData}></AntDrawer>
                <Button type="primary" icon={<PlusOutlined />}  onClick={showDrawer} >
                    Agregar
                </Button>
                <Table columns={columns} dataSource={data} ></Table>
            </>

        );
    };
