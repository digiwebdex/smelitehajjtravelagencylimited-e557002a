
-- CRITICAL FIX: Attach ALL missing database triggers

-- Auto-create customer record when booking is created
DROP TRIGGER IF EXISTS trg_create_customer_from_booking ON public.bookings;
CREATE TRIGGER trg_create_customer_from_booking
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.create_customer_from_booking();

-- Auto-calculate booking total_price from package price × passengers
DROP TRIGGER IF EXISTS trg_set_booking_total_price ON public.bookings;
CREATE TRIGGER trg_set_booking_total_price
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_booking_total_price();

-- Auto-update account balances when ledger entries change
DROP TRIGGER IF EXISTS trg_update_account_balance ON public.general_ledger;
CREATE TRIGGER trg_update_account_balance
  AFTER INSERT OR UPDATE OR DELETE ON public.general_ledger
  FOR EACH ROW
  EXECUTE FUNCTION public.update_account_balance_on_ledger_change();

-- Auto-update updated_at timestamps
DROP TRIGGER IF EXISTS trg_bookings_updated_at ON public.bookings;
CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_packages_updated_at ON public.packages;
CREATE TRIGGER trg_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_customers_updated_at ON public.customers;
CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_visa_applications_updated_at ON public.visa_applications;
CREATE TRIGGER trg_visa_applications_updated_at
  BEFORE UPDATE ON public.visa_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_emi_payments_updated_at ON public.emi_payments;
CREATE TRIGGER trg_emi_payments_updated_at
  BEFORE UPDATE ON public.emi_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_emi_installments_updated_at ON public.emi_installments;
CREATE TRIGGER trg_emi_installments_updated_at
  BEFORE UPDATE ON public.emi_installments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_agents_updated_at ON public.agents;
CREATE TRIGGER trg_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_air_ticket_bookings_updated_at ON public.air_ticket_bookings;
CREATE TRIGGER trg_air_ticket_bookings_updated_at
  BEFORE UPDATE ON public.air_ticket_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Recalculate all existing account balances now
SELECT public.recalculate_account_balances();
