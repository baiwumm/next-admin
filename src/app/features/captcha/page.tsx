/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-02 16:35:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-03 13:45:35
 * @Description: 验证码
 */
'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from '@nextui-org/react';
import { useMount } from 'ahooks';
import { toNumber } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { createRef, useState } from 'react';
import { toast } from 'sonner';

import { getRandomImg } from '@/lib/utils';

import DragCaptcha, { type DragCaptchaRef } from './components/DragCaptcha'; // 滑块验证码
import GraphicCaptcha, { type GraphicCaptchaRef } from './components/GraphicCaptcha'; // 图形验证码
import OperationCaptcha, { type OperationCaptchaRef } from './components/OperationCaptcha'; // 运算验证码
import PointCaptcha, { type PointCaptchaRef } from './components/PointCaptcha'; // 点选验证码
import PuzzleCaptcha, { type PuzzleCaptchaRef } from './components/PuzzleCaptcha'; // 拼图验证码
import RotateCaptcha, { type RotateCaptchaRef } from './components/RotateCaptcha'; // 图片旋转验证码

export default function Captcha() {
  const t = useTranslations('Pages.captcha');
  const tRoute = useTranslations('Route');
  const tGlobal = useTranslations('Global');

  const [graphicInput, setGraphicInput] = useState(''); // 图形验证码输入的值
  const [operationInput, setOperationInput] = useState(''); // 运算验证码输入的值
  const [imgSrc, setImgSrc] = useState<string>(); // 图片地址
  // 图形验证码
  const graphicCaptchaRef = createRef<GraphicCaptchaRef>();
  // 运算验证码
  const operationCaptchaRef = createRef<OperationCaptchaRef>();
  // 滑块验证码
  const dragCaptchaRef = createRef<DragCaptchaRef>();
  // 图片旋转验证码
  const rotateCaptchaRef = createRef<RotateCaptchaRef>();
  // 拼图验证码
  const puzzleCaptchaRef = createRef<PuzzleCaptchaRef>();
  // 点选验证码
  const pointCaptchaRef = createRef<PointCaptchaRef>();

  // 验证判断
  const validateCaptcha = (empty: boolean, success: boolean) => {
    if (empty) {
      toast.warning(tGlobal('enter') + tRoute('captcha'));
    } else if (success) {
      toast.success(t('verifySuccess'));
    } else {
      toast.error(t('verifyError'));
    }
  };

  // 验证图形验证码
  const checkGraphicCaptcha = () => {
    if (graphicCaptchaRef.current) {
      validateCaptcha(
        !graphicInput,
        graphicCaptchaRef.current.identifyCode.toLowerCase() === graphicInput.toLowerCase(),
      );
    }
  };

  // 验证运算验证码
  const checkOperationCaptcha = () => {
    if (operationCaptchaRef.current) {
      validateCaptcha(!operationInput, toNumber(operationCaptchaRef.current.result) === toNumber(operationInput));
    }
  };

  // 重置滑块验证码
  const resetDragCaptcha = () => {
    dragCaptchaRef?.current?.reset();
  };

  // 滑块验证码成功回调
  const onDragCaptchaSuccess = (seconds: number) => {
    toast.success(t('slideCodeSuccess', { seconds }));
  };

  // 重置图片旋转验证码
  const resetRotateCaptchaRef = () => {
    setImgSrc(getRandomImg() as string);
    rotateCaptchaRef?.current?.reset();
  };

  // 图片旋转验证码成功回调
  const onRotateCaptchaSuccess = (seconds: number) => {
    toast.success(t('slideCodeSuccess', { seconds }));
  };

  // 重置拼图验证码
  const resetPuzzleCaptcha = () => {
    puzzleCaptchaRef?.current?.reset();
  };

  // 点选验证码回调
  const onPointCaptchaCallback = (result: boolean) => {
    if (result) {
      toast.success(t('verifySuccess'));
    } else {
      toast.error(t('verifyError'));
    }
  };

  // 重置点选验证码
  const resetPointCaptcha = () => {
    pointCaptchaRef?.current?.refresh();
  };

  useMount(() => {
    setImgSrc(getRandomImg() as string);
  });
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <h3 className="font-bold text-large">{tRoute('captcha')}</h3>
        </CardHeader>
        <CardBody>
          <p className="text-small">{t('subTitle')}</p>
        </CardBody>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 图形验证码 */}
        <Card>
          <CardHeader>
            <h4 className="font-bold text-large">{t('graphicCode')}</h4>
          </CardHeader>
          <Divider />
          <CardBody className="flex-row justify-center pb-0">
            <GraphicCaptcha
              onRef={graphicCaptchaRef}
              contentWidth={160}
              contentHeight={40}
              backgroundColorMin={0}
              backgroundColorMax={255}
            />
          </CardBody>
          <CardFooter className="justify-center">
            <div className="flex w-full max-w-sm items-center space-x-2 justify-center">
              <Input
                placeholder={tGlobal('enter') + tRoute('captcha')}
                size="sm"
                value={graphicInput}
                onChange={(e) => setGraphicInput(e.target.value)}
              />
              <Button color="primary" size="sm" onPress={checkGraphicCaptcha}>
                {t('verify')}
              </Button>
            </div>
          </CardFooter>
        </Card>
        {/* 运算验证码 */}
        <Card>
          <CardHeader>
            <h4 className="font-bold text-large">{t('operationCode')}</h4>
          </CardHeader>
          <Divider />
          <CardBody className="flex-row justify-center pb-0">
            <OperationCaptcha onRef={operationCaptchaRef} width={160} height={40} />
          </CardBody>
          <CardFooter className="justify-center">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                placeholder={tGlobal('enter') + tRoute('captcha')}
                size="sm"
                value={operationInput}
                onChange={(e) => setOperationInput(e.target.value)}
              />
              <Button color="primary" size="sm" onPress={checkOperationCaptcha}>
                {t('verify')}
              </Button>
            </div>
          </CardFooter>
        </Card>
        {/* 滑块验证码 */}
        <Card>
          <CardHeader>
            <h4 className="font-bold text-large">{t('slideCode')}</h4>
          </CardHeader>
          <Divider />
          <CardBody className="flex-row justify-center pb-0">
            <DragCaptcha onRef={dragCaptchaRef} passSuccess={onDragCaptchaSuccess} />
          </CardBody>
          <CardFooter>
            <Button color="primary" onPress={resetDragCaptcha} size="sm" className="w-full">
              {tGlobal('reset')}
            </Button>
          </CardFooter>
        </Card>
        {/* 图片旋转验证码 */}
        <Card>
          <CardHeader>
            <h4 className="font-bold text-large">{t('rotateCode')}</h4>
          </CardHeader>
          <Divider />
          <CardBody className="flex-row justify-center pb-0">
            <RotateCaptcha onRef={rotateCaptchaRef} width={250} imgSrc={imgSrc} success={onRotateCaptchaSuccess} />
          </CardBody>
          <CardFooter>
            <Button color="primary" onPress={resetRotateCaptchaRef} size="sm" className="w-full">
              {tGlobal('reset')}
            </Button>
          </CardFooter>
        </Card>
        {/* 拼图验证码 */}
        <Card>
          <CardHeader>
            <h4 className="font-bold text-large">{t('puzzleCode')}</h4>
          </CardHeader>
          <Divider />
          <CardBody className="flex-row justify-center pb-0">
            <PuzzleCaptcha onRef={puzzleCaptchaRef} height={235} onSuccess={() => toast.success(t('verifySuccess'))} />
          </CardBody>
          <CardFooter>
            <Button color="primary" onPress={resetPuzzleCaptcha} size="sm" className="w-full">
              {tGlobal('reset')}
            </Button>
          </CardFooter>
        </Card>
        {/* 点选验证码 */}
        <Card>
          <CardHeader>
            <h4 className="font-bold text-large">{t('pointsCode')}</h4>
          </CardHeader>
          <Divider />
          <CardBody className="flex-row justify-center pb-0">
            <PointCaptcha
              onRef={pointCaptchaRef}
              imgs={getRandomImg(20) as string[]}
              width={300}
              height={230}
              callback={onPointCaptchaCallback}
            />
          </CardBody>
          <CardFooter>
            <Button color="primary" onPress={resetPointCaptcha} size="sm" className="w-full">
              {tGlobal('reset')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
