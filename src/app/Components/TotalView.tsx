const TotalView = (props:any) => {
  const {total} = props;
  
  return (
    <div className="flex justify-between p-3">
      <span>Total</span>
      <span>${total}</span>
    </div>
  )
}

export default TotalView