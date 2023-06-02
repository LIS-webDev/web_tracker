<?php

namespace BitBalance;

use Bitrix\Main\Loader;
use Bitrix\Highloadblock as HL;
use Bitrix\Main\Entity;

Loader::includeModule("highloadblock");

class Highload {

    public int $higloadId;
    public \Bitrix\Main\Entity\Base $entity;
    public  $entity_data_class;

    public function __construct(int $id)
    {        $this->higloadId = $id;
        $hlblArray = $this->getHlblockArray($id);
        $this->entity = HL\HighloadBlockTable::compileEntity($hlblArray);
        $this->entity_data_class = $this->entity->getDataClass();
    }

    public function getHlblockArray(int $id = 0):array
    {
        if ($id == 0) {
            $id = $this->higloadId;
        }
        return HL\HighloadBlockTable::getById($id)->fetch();
    }

    /**
     * @return Entity\Base
     */
    public function getEntity(): Entity\Base
    {
        return $this->entity;
    }

    /**
     * @return \Bitrix\Main\ORM\Data\DataManager
     */
    public function getEntityDataClass()
    {
        return $this->entity_data_class;
    }

    public function add(array $data):int
    {
         $resId = $this->getEntityDataClass()::add($data);
//         \BitBalance\Tools::log($resId->getId());
         return $resId->getId();
    }

}
