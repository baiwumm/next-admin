/* eslint-disable complexity */
/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-14 16:17:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-03 11:36:20
 * @Description: 图片旋转验证码
 */
import { cn, Image } from '@nextui-org/react';
import { RiArrowRightDoubleLine, RiCheckboxCircleLine } from '@remixicon/react';
import { useMount, useSetState } from 'ahooks';
import dayjs from 'dayjs';
import { divide, round, subtract } from 'lodash-es';
import { CSSProperties, FC, type MouseEventHandler, RefObject, useImperativeHandle, useRef } from 'react';

import styles from './rotate.module.scss';

export type RotateCaptchaRef = {
  reset: () => void;
};

type RotateCaptchaProps = {
  onRef?: RefObject<RotateCaptchaRef | null>;
  imgSrc?: string; // 图片地址
  width?: number; // 宽度
  height?: number; // 高度
  text?: string; // 验证码文本
  successText?: string; // 验证通过文字
  background?: string; // 背景色
  progressBarBg?: string; // 滑块背景色
  completedBg?: string; // 验证成功背景色
  circle?: boolean; // 是否为圆形
  radius?: string; // 圆角
  handlerBg?: string; // 滑块背景色
  textSize?: string; // 文字大小
  textColor?: string; // 文字颜色
  showTips?: boolean; // 是否显示底部提示
  successTip?: string; // 验证通过提示
  failTip?: string; // 验证失败提示
  diffDegree?: number; // 在此范围内松开计算验证成功(单位°)
  minDegree?: number; // 最小旋转角度
  maxDegree?: number; // 最大旋转角度
  move?: () => void; // 开始拖拽回调
  fail?: () => void; // 验证失败回调
  success?: (seconds: number) => void; // 验证成功回调
};

type State = {
  isPassing: boolean; // 是否处于验证状态
  isMoving: boolean; // 是否处于拖动状态
  mouseX: number; // 鼠标当前位置
  isOk: boolean; // 是否验证成功
  showBar: boolean; // 是否显示进度条
  showErrorTip: boolean; // 是否显示错误信息
  ranRotate: number; //  随机旋转角度
  cRotate: number; // 当前旋转角度
  imgStyle: CSSProperties; // 图片样式
  startTime: number; // 开始时间
  endTime: number; // 结束时间
};

const RotateCaptcha: FC<RotateCaptchaProps> = ({
  onRef,
  imgSrc,
  width = 250,
  height = 40,
  text = '请按住滑块拖动',
  successText = '验证通过',
  background = '#eee',
  progressBarBg = '#76c61d',
  completedBg = '#76c61d',
  circle = false,
  radius = '4px',
  handlerBg = '#fff',
  textSize = '14px',
  textColor = '#333',
  showTips = true,
  successTip = '验证通过',
  failTip = '验证失败',
  diffDegree = 10,
  minDegree = 90,
  maxDegree = 200,
  move,
  fail,
  success,
}) => {
  // 初始化数据
  const initState = (): State => ({
    isPassing: false,
    isMoving: false,
    mouseX: 0,
    isOk: false,
    showBar: false,
    showErrorTip: false,
    ranRotate: 0,
    cRotate: 0,
    imgStyle: {},
    startTime: 0,
    endTime: 0,
  });

  const [state, setState] = useSetState(initState());

  const dragCaptchaRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // 开始拖拽回调
  const dragStart: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!state.isPassing) {
      setState({
        startTime: dayjs().valueOf(),
        isMoving: true,
        mouseX: e.pageX,
      });
    }
    setState({
      showBar: true,
      showErrorTip: false,
    });
    move?.();
  };

  // 避免指定旋转角度时一直拖动到最右侧才验证通过
  const factor = () => {
    if (minDegree === maxDegree) {
      return Math.floor(1 + Math.random() * 6) / 10 + 1;
    }
    return 1;
  };

  // 拖拽移动回调
  const dragMoving: MouseEventHandler<HTMLDivElement> = (e) => {
    if (state.isMoving && !state.isPassing) {
      const diffX = e.pageX - state.mouseX;
      if (handlerRef.current) {
        handlerRef.current.style.left = `${diffX}px`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${diffX + height / 2}px`;
      }
      const cRotate = Math.ceil((diffX / (width - height)) * maxDegree * factor());
      setState({
        cRotate,
      });
      state.imgStyle = {
        transform: `rotateZ(${state.ranRotate - cRotate}deg)`,
      };
    }
  };

  // 验证通过回调
  const passVerify = () => {
    state.endTime = dayjs().valueOf();
    state.isPassing = true;
    state.isMoving = false;
    if (progressBarRef.current) {
      progressBarRef.current.style.background = completedBg;
      progressBarRef.current.style.color = '#fff';
      progressBarRef.current.style.fontSize = textSize;
    }
    success?.(round(divide(subtract(state.endTime, state.startTime), 1000), 2));
  };

  // 拖拽结束回调
  const dragFinish = () => {
    if (state.isMoving && !state.isPassing) {
      if (Math.abs(state.ranRotate - state.cRotate) > diffDegree) {
        setState({
          isOk: true,
          imgStyle: {
            transform: `rotateZ(${state.ranRotate}deg)`,
          },
        });
        setTimeout(() => {
          if (handlerRef.current) {
            handlerRef.current.style.left = '0';
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.width = '0';
          }
          setState({
            isOk: false,
          });
        }, 500);
        setState({
          showErrorTip: true,
        });
        fail?.();
      } else {
        passVerify();
      }
      setState({
        isMoving: false,
      });
    }
  };

  const checkimgLoaded = () => {
    setState({
      ranRotate: Math.floor(minDegree + Math.random() * (maxDegree - minDegree)), // 生成随机角度,
      imgStyle: {
        transform: `rotateZ(${state.ranRotate}deg)`,
      },
    });
  };

  const reImg = () => {
    // 重置状态
    setState(initState());
    if (handlerRef.current) {
      handlerRef.current.style.left = '0';
    }
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0';
    }
    if (messageRef.current) {
      messageRef.current.style.color = background;
    }
  };

  const reset = () => {
    reImg();
    checkimgLoaded();
  };

  useMount(() => {
    if (dragCaptchaRef.current) {
      dragCaptchaRef.current.style.setProperty('--textColor', textColor);
      dragCaptchaRef.current.style.setProperty('--width', `${Math.floor(width / 2)}px`);
      dragCaptchaRef.current.style.setProperty('--pwidth', `${-Math.floor(width / 2)}px`);
    }
    reset();
  });

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ reset }));

  return (
    <div className="relative rounded-full">
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '50%',
        }}
      >
        <Image
          src={imgSrc}
          style={state.imgStyle}
          onLoad={checkimgLoaded}
          alt="RotateCaptcha"
          width={width}
          height={width}
          className={cn(
            'w-full h-full object-cover',
            state.isOk ? 'transition-transform duration-500 ease-linear' : '',
          )}
        />
        {showTips && state.isPassing && (
          <div className="absolute bottom-6 h-5 leading-5 text-center w-full text-xs z-50 bg-white/60 text-green-500">
            {successTip}
          </div>
        )}
        {showTips && !state.isPassing && state.showErrorTip && (
          <div className="absolute bottom-6 h-5 leading-5 text-center w-full text-xs z-50 bg-black/60 text-yellow-500">
            {failTip}
          </div>
        )}
      </div>
      <div
        ref={dragCaptchaRef}
        className="relative bg-[#e8e8e8] text-center overflow-hidden"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          lineHeight: `${height}px`,
          background: background,
          borderRadius: circle ? `${height / 2}px` : radius,
        }}
        onMouseMove={dragMoving}
        onMouseUp={dragFinish}
        onMouseLeave={dragFinish}
      >
        <div
          ref={progressBarRef}
          className={cn('absolute h-8 w-0', state.isOk ? '!w-0 transition-[width] duration-500' : '')}
          style={{
            background: progressBarBg,
            height: `${height}px`,
            borderRadius: circle ? `${height / 2}px 0 0 ${height / 2}px` : radius,
          }}
        >
          {state.isPassing ? successText : ''}
        </div>
        <div
          ref={messageRef}
          className={styles['dv_text']}
          style={{
            height: `${height}px`,
            width: `${width}px`,
            fontSize: textSize,
          }}
        >
          {state.isPassing ? '' : text}
        </div>
        <div
          ref={handlerRef}
          className="absolute top-0 left-0 cursor-move flex justify-center items-center border box-border"
          style={{
            left: state.isOk ? 0 : undefined,
            width: `${height}px`,
            height: `${height}px`,
            background: handlerBg,
            transition: state.isOk ? 'left 0.5s' : undefined,
          }}
          onMouseDown={dragStart}
        >
          {state.isPassing ? (
            <RiCheckboxCircleLine size={16} color={completedBg} />
          ) : (
            <RiArrowRightDoubleLine size={16} color="#000" />
          )}
        </div>
      </div>
    </div>
  );
};
export default RotateCaptcha;
