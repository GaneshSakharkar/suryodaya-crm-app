import { Input, Radio } from "@material-tailwind/react";

const PaymentDetails = ({
  formData,
  errors,
  handleChange,
  paymentTypes,
  isInstallment,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
      <div className="mt-5">
        <Input
          label="Total Fees"
          type="number"
          name="totalFees"
          value={formData.totalFees}
          onChange={handleChange}
          error={errors.totalFees}
          readOnly
        />
        {errors.totalFees && (
          <p className="text-red-500 text-sm">{errors.totalFees}</p>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Payment Type</h2>
        {paymentTypes.map((type) => (
          <Radio
            key={type}
            label={type}
            name="paymentType"
            value={type}
            checked={formData.paymentType === type}
            onChange={handleChange}
          />
        ))}
        {errors.paymentType && (
          <p className="text-red-500 text-sm">{errors.paymentType}</p>
        )}
      </div>
      <div className="mt-5">
        <Input
          label="Amount Paid"
          type="number"
          name="amountPaid"
          value={formData.amountPaid}
          onChange={handleChange}
          error={errors.amountPaid}
        />
        {errors.amountPaid && (
          <p className="text-red-500 text-sm">{errors.amountPaid}</p>
        )}
      </div>

      {isInstallment && (
        <>
          <div className="mt-5">
            <Input
              label="Installment Months"
              type="number"
              name="installmentMonths"
              value={formData.installmentMonths}
              onChange={handleChange}
              error={errors.installmentMonths}
            />
            {errors.installmentMonths && (
              <p className="text-red-500 text-sm">{errors.installmentMonths}</p>
            )}
          </div>
          <div className="mt-5">
            <Input
              label="Installments"
              type="number"
              name="installments"
              value={formData.installments}
              readOnly
            />
            {errors.installments && (
              <p className="text-red-500 text-sm">{errors.installments}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentDetails;
