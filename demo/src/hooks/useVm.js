import { useRef } from 'react';

//// this function is used to inject the view model of the component when it is rendered
//// it creates an instance only onRender
/// it also destroy the instance onUnmount
export function useVm(VmConstructor, args) {
  let vmRef = useRef(null);
  if (!vmRef.current) {
    vmRef.current = new VmConstructor(args);
  }
  return vmRef.current;
}
