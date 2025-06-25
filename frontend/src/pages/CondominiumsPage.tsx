import { useState, useEffect, type FormEvent } from 'react';
import {
  PageSection,
  Title,
  Spinner,
  Bullseye,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  TextInput,
  Alert,
  AlertActionCloseButton,
  Flex,
  FlexItem,
  Grid,
  GridItem,
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ActionsColumn,
  type IAction,
} from '@patternfly/react-table';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { type Condominium, type CreateCondominiumData } from '../types';

export function CondominiumsPage() {
  const [condominiums, setCondominiums] = useState<Condominium[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

  const [editModalState, setEditModalState] = useState<{ isOpen: boolean; condo: Condominium | null }>({ isOpen: false, condo: null });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // Usamos 'Partial' porque el formulario se llena campo por campo.
  const [newCondoData, setNewCondoData] = useState<Partial<CreateCondominiumData>>({});
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; condo: Condominium | null }>({ isOpen: false, condo: null });


  const fetchCondominiums = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('/api/condominiums', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCondominiums(response.data);
    } catch (err) {
      setError('No se pudieron cargar los condominios.');
      console.error('Failed to fetch condominiums:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCondominiums();
  }, [token]);

  const handleEditClick = (condo: Condominium) => setEditModalState({ isOpen: true, condo: { ...condo } });
  const handleEditModalClose = () => setEditModalState({ isOpen: false, condo: null });
  const handleEditFormChange = (event: FormEvent<HTMLInputElement>, value: string) => {
    const { name } = event.currentTarget;
    setEditModalState(prevState => ({ ...prevState, condo: prevState.condo ? { ...prevState.condo, [name]: value } : null, }));
  };
  const handleEditSave = async () => {
    if (!editModalState.condo) return;
    try {
      // Ahora enviamos todos los datos editables, no solo el nombre
      const { id, ...updateData } = editModalState.condo;
      await axios.patch(`/api/condominiums/${id}`, updateData, { headers: { Authorization: `Bearer ${token}` } });
      handleEditModalClose();
      await fetchCondominiums();
    } catch (err) {
      setError('Error al actualizar el condominio.');
    }
  };

  const handleDeleteClick = (condo: Condominium) => setDeleteModalState({ isOpen: true, condo });
  const handleDeleteModalClose = () => setDeleteModalState({ isOpen: false, condo: null });
  const handleConfirmDelete = async () => {
    if (!deleteModalState.condo) return;
    try {
      await axios.delete(`/api/condominiums/${deleteModalState.condo.id}`, { headers: { Authorization: `Bearer ${token}` } });
      handleDeleteModalClose();
      await fetchCondominiums();
    } catch (err) {
      setError('Error al eliminar el condominio.');
    }
  };

  const handleCreateModalOpen = () => {
    setNewCondoData({});
    setIsCreateModalOpen(true);
  };
  const handleCreateModalClose = () => setIsCreateModalOpen(false);
  const handleCreateFormChange = (event: FormEvent<HTMLInputElement>, value: string) => {
    const { name } = event.currentTarget;
    setNewCondoData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleCreateSave = async () => {
    if (!user) {
      setError("No se pudo identificar al administrador.");
      return;
    }
    try {
      const fullCondoData = { ...newCondoData, administratorId: user.sub };
      await axios.post('/api/condominiums', fullCondoData, { headers: { Authorization: `Bearer ${token}` } });
      handleCreateModalClose();
      await fetchCondominiums();
    } catch (err) {
      setError('Error al crear el condominio. Verifica que todos los campos requeridos estén llenos.');
    }
  };

  if (isLoading) { return (<Bullseye><Spinner size="xl" /></Bullseye>); }

  // --- FORMULARIOS COMPLETOS ---
  const condominiumForm = (data: Partial<Condominium>, handler: (event: FormEvent<HTMLInputElement>, value: string) => void) => (
    <Form>
      <Grid hasGutter md={6}>
        <GridItem>
          <FormGroup label="Nombre del Condominio" fieldId="name" isRequired>
            <TextInput type="text" id="name" name="name" value={data.name || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="Calle" fieldId="street" isRequired>
            <TextInput type="text" id="street" name="street" value={data.street || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="Número Exterior" fieldId="exteriorNumber" isRequired>
            <TextInput type="text" id="exteriorNumber" name="exteriorNumber" value={data.exteriorNumber || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="Número Interior" fieldId="interiorNumber">
            <TextInput type="text" id="interiorNumber" name="interiorNumber" value={data.interiorNumber || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="Colonia" fieldId="neighborhood" isRequired>
            <TextInput type="text" id="neighborhood" name="neighborhood" value={data.neighborhood || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="Código Postal" fieldId="postalCode" isRequired>
            <TextInput type="text" id="postalCode" name="postalCode" value={data.postalCode || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="Municipio" fieldId="municipality" isRequired>
            <TextInput type="text" id="municipality" name="municipality" value={data.municipality || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="Estado" fieldId="state" isRequired>
            <TextInput type="text" id="state" name="state" value={data.state || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="RFC (taxId)" fieldId="taxId" isRequired>
            <TextInput type="text" id="taxId" name="taxId" value={data.taxId || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="Código de Régimen Fiscal" fieldId="fiscalRegimeCode" isRequired>
            <TextInput type="text" id="fiscalRegimeCode" name="fiscalRegimeCode" value={data.fiscalRegimeCode || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <FormGroup label="Teléfono" fieldId="phone">
            <TextInput type="tel" id="phone" name="phone" value={data.phone || ''} onChange={handler} />
          </FormGroup>
        </GridItem>
      </Grid>
    </Form>
  );

  return (
    <>
      <PageSection variant="default">
        <Flex>
          <FlexItem><Title headingLevel="h1">Administración de Condominios</Title></FlexItem>
          <FlexItem align={{ default: 'alignRight' }}><Button variant="primary" onClick={handleCreateModalOpen}>Crear Nuevo Condominio</Button></FlexItem>
        </Flex>
        {error && (<Alert variant="danger" title={error} actionClose={<AlertActionCloseButton onClose={() => setError(null)} />} />)}
      </PageSection>
      <PageSection>
        <Table aria-label="Tabla de Condominios">
          <Thead><Tr><Th>Nombre</Th><Th>Dirección</Th><Th>Estado</Th><Th>RFC</Th><Th /></Tr></Thead>
          <Tbody>
            {condominiums.map((condo) => {
              const rowActions: IAction[] = [ { title: 'Editar', onClick: () => handleEditClick(condo) }, { title: 'Eliminar', onClick: () => handleDeleteClick(condo) }];
              return (
                <Tr key={condo.id}>
                  <Td dataLabel="Nombre">{condo.name}</Td>
                  <Td dataLabel="Dirección">{condo.street}</Td>
                  <Td dataLabel="Estado">{condo.state}</Td>
                  <Td dataLabel="RFC">{condo.taxId}</Td>
                  <Td isActionCell><ActionsColumn items={rowActions} /></Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </PageSection>

      {/* Modal de Creación */}
      {isCreateModalOpen && (
        <Modal variant="medium" title="Crear Nuevo Condominio" isOpen={isCreateModalOpen} onClose={handleCreateModalClose}>
          <ModalHeader title="Crear Nuevo Condominio" titleIconVariant="info"/>
          <ModalBody>{condominiumForm(newCondoData, handleCreateFormChange)}</ModalBody>
          <ModalFooter>
            <Button key="create" variant="primary" onClick={handleCreateSave}>Crear</Button>
            <Button key="cancel-create" variant="link" onClick={handleCreateModalClose}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      )}

      {/* Modal de Edición */}
      {editModalState.isOpen && (
        <Modal variant="medium" title="Editar Condominio" isOpen={editModalState.isOpen} onClose={handleEditModalClose}>
          <ModalHeader title="Editar Condominio" titleIconVariant="warning"/>
          <ModalBody>{condominiumForm(editModalState.condo || {}, handleEditFormChange)}</ModalBody>
          <ModalFooter>
            <Button key="save" variant="primary" onClick={handleEditSave}>Guardar Cambios</Button>
            <Button key="cancel" variant="link" onClick={handleEditModalClose}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      )}

      {/* Modal de Eliminación */}
      {deleteModalState.isOpen && (
        <Modal variant="medium" title="Eliminar Condominio" isOpen={deleteModalState.isOpen} onClose={handleDeleteModalClose} >
          <ModalHeader title="Eliminar Condominio" titleIconVariant="danger" />
          <ModalBody>
            <span id="modal-comdominium-edit"></span>
            ¿Estás seguro de que quieres eliminar "<strong>{deleteModalState.condo?.name}</strong>"?
          </ModalBody>
          <ModalFooter>
            <Button key="delete" variant="danger" onClick={handleConfirmDelete}>Sí, Eliminar</Button>
            <Button key="cancel-delete" variant="link" onClick={handleDeleteModalClose}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}