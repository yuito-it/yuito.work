import Link from 'next/link';
import { ComponentPropsWithoutRef, Ref, forwardRef } from 'react';
const styles = {
    commonDesign: "border-b dark:text-white px-4 py-2 leading-none m-2",
    linkDisabled: "opacity-50 cursor-not-allowed leading-none",
};

// buttonタグのprops + ref
type ButtonProps = ComponentPropsWithoutRef<'button'> & { ref?: Ref<HTMLButtonElement> };
// next/link のprops + disabled
type CustomLinkProps = ComponentPropsWithoutRef<typeof Link> & {
    disabled?: boolean;
    back?: string;
};
// Buttonコンポーネントが受け取ることができる値
type AS = 'button' | 'Link';
// Buttonコンポーネントが設定できるprops
type Props<T extends AS> = T extends 'button' ? ButtonProps : CustomLinkProps;


// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props<AS>>((props, ref) => {
    const { disabled, back = false, ...linkAttributes } = props as unknown as CustomLinkProps;
    if (back) {
        const { disabled, ...linkAttributes } = props as unknown as CustomLinkProps;
        return (
            <Link ref={ref as Ref<HTMLAnchorElement>} className={`${styles.commonDesign} ${disabled && styles.linkDisabled} group relative inline-flex gap-2 h-12 items-center justify-center px-6 font-medium`} {...linkAttributes}><div className="ml-1 transition translate-x-1 group-hover:translate-x-0">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                    <path d="M6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.70711 8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H3.70711L6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div><span>
                    {linkAttributes.children}</span>
            </Link>
        );
    }
    // propsにhrefがあればLinkコンポーネントとしてレンダリング
    if ('href' in props) {
        return (
            <Link ref={ref as Ref<HTMLAnchorElement>} className={`${styles.commonDesign} ${disabled && styles.linkDisabled} group relative inline-flex h-12 items-center justify-center px-6 font-medium`} {...linkAttributes}><span>
                {linkAttributes.children}</span><div className="ml-1 transition group-hover:translate-x-1">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div>
            </Link>
        );
    }
    // buttonタグとしてレンダリング
    const buttonAttributes = props as ButtonProps;
    return (
        <button ref={ref as Ref<HTMLButtonElement>} className={styles.commonDesign} {...buttonAttributes}>
            {buttonAttributes.children}
        </button>
    );
}) as <T extends 'button' | 'Link' = 'button'>(p: Props<T>) => JSX.Element;
