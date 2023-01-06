export const FancyImage: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { fancyLabel?: string; fancyLabelBottom?: JSX.Element }
> = (props) => {
  const { fancyLabel, fancyLabelBottom, ...imgProps } = props;
  return (
    <div className="thumbnail-image-wrapper">
      <img alt="fancy" loading="lazy" className="thumbnail-image" {...imgProps} />
      {fancyLabel && <span className="fancy-label">{fancyLabel}</span>}
      {fancyLabelBottom && (
        <span className="fancy-label-bottom">{fancyLabelBottom}</span>
      )}
    </div>
  );
};
